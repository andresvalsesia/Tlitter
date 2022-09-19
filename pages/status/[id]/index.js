/* import apiUrl from '../../../../apiUrl'; */
import Tweet from '../../../components/Tweet/index';
import {firestore} from '../../../firebase/admin';
import {useRouter} from 'next/router';

export default function TweetPage(props){
    
    const router=useRouter();

    

    return(
        <>

       <Tweet {...props} /> 
       
      
        </>
    )
}

//Lo que se Devuelva en este metodo llega como props al componente. 
/* export async function getServerSideProps (context){ 
    const id=context.params.id
    const res=context.res


    const response= await fetch(`http://localhost:3000/api/tweet/${id}`)

              if(response.ok){
                    const props= await response.json()
                    return {props}

                }
                if(res){
                    res.writeHead(301,{Location:"/home"}).end()
                }
          
}  */



 /* export async function getStaticPaths(){
    return {
        paths:[{params:{id:"540LhwG92CXeD6yQ0iml"}}],
        fallback:false
    }
}

export async function getStaticProps (context){
    const id=context.params.id


   return firestore
    .collection('tliters')
    .doc(id)
    .get()
    .then(doc=>{
      const data=doc.data()
      const id=doc.id
      const {createAt}=data

      const props=
        
        {...data,
         id,
         createAt:+createAt.toDate() 
        }
        
      return props;

    }).catch(err=>{
     return {}
    })
              
          
} */ 

  TweetPage.getInitialProps=(context)=>{
    const id=context.query.id
    const res=context.res

    console.log(id)
    return fetch(`http://localhost:3000/api/tweet/${id}`)
            .then(response=>{
                if(response.ok){
                    return response.json()
                }
                if(res){
                    res.writeHead(404).end()
                }
            })


}