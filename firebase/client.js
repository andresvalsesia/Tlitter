import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA0jznntdxK_FfMuFi7-MQWXnVSc0_aaFM",
    authDomain: "tlitter-f6425.firebaseapp.com",
    projectId: "tlitter-f6425",
    storageBucket: "tlitter-f6425.appspot.com",
    messagingSenderId: "612886198782",
    appId: "1:612886198782:web:860d9954290206a19528af",
    measurementId: "G-F3PKR8Y9VN"
  };


  const mapUserFromFirebaseAuthToUser=(user)=>{
    const {email,photoURL,displayName,uid}=user;
   
    
    return {
        avatar:photoURL,
        username:displayName,
        email,
        uid
    }
  }

  //Actualiza datos del usuario
  export const onAuthStateChanged=(onChange)=>{
    return firebase
            .auth()
            .onAuthStateChanged(user=>{
            const normalizeUser= user ?
            mapUserFromFirebaseAuthToUser(user) : null
            onChange(normalizeUser)
        })
  }



  //si no tenemos ninguna app utlizada de firebase que inicie Github
  !firebase.apps.length && firebase.initializeApp(firebaseConfig)
  var db = firebase.firestore();
 

  export const loginWithGithub= ()=>{
           const githubProvider=new firebase.auth.GithubAuthProvider() 
           return firebase.auth().signInWithPopup(githubProvider)
                    .then(mapUserFromFirebaseAuthToUser)
            
  }


//enviar tweet

export const addTlitter= ({avatar,content,userId,userName,img})=>{

  return db.collection('tliters').add({
    avatar,
    content,
    userId,
    userName,
    img,
    createAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount:0,
    sharedCount:0
  })
    

}



const mapTweetFromFirebase= doc =>{
  const data= doc.data()
  const id= doc.id
  const {createAt}=data


  return {

   ...data,
   id:id,
   createAt:+createAt.toDate()
  
  }

}

// esuchar cada vez que se crea o elimina un tweet

/* export const listenLatesTweets = (callback) =>{
    return db
    .collection("tliters")
    .orderBy("createAt","desc")
    .onSnapshot(snapshot=>{
      snapshot.docs.map(doc=>{
          let newTwitter=mapTweetFromFirebase(doc)
          callback(newTwitter)  
      })
    })
} */

//traer toda la coleccion de tweet
export const fetchLatesTlitter=() => {
      return db.collection('tliters')
      .orderBy("createAt")
      .get()
      .then((snapshot) => {
       return snapshot.docs.map(doc=>{
        //traer todos los campos del documento
           return mapTweetFromFirebase(doc)
       })
      })
}

//suba de archivos
export const uploadImage=(file)=>{
        let ref= firebase.storage().ref(`images/${file.name}`);
        const task= ref.put(file)

        return task;

}