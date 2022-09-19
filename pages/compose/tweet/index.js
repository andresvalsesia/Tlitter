import React,{useState,useEffect} from 'react';
import styles from '../../../styles/Home.module.css';
import AppLayout from '../../../components/AppLayout/index';
import Button from '../../../components/Button/index';
import useUser from '../../../hooks/useUser';
import Avatar from '../../../components/Icons/Avatar';
import {addTlitter,uploadImage} from '../../../firebase/client';
import {useRouter} from 'next/router';
import Head from 'next/head';

const COMPOSE_STATES={
    USER_NOT_KNOW:0,
    LOADING:1,
    SUCCESS:2,
    ERROR:-1
}

const DRAG_IMAGE_STATES={
    ERROR: -1,
    NONE:0,
    DRAG_OVER:1,
    UPLOADING:2,
    COMPLETE:3
}


export default function ComposeTweet(){
 const user=useUser();
 const [message, setMessage]=useState("");
 const [status,setStatus]=useState(COMPOSE_STATES.USER_NOT_KNOW)
 const [drag,setDrag]=useState(DRAG_IMAGE_STATES.NONE)
 const [task,setTask]=useState(null)
 const [imgURL,setimgURL]=useState(null)


 
 const router=useRouter();

 useEffect(() => {
    if(task){
         let onProgress=()=>{}
         let onError=()=>{}
         let onComplete=()=>{
                console.log('completado')
                task.snapshot.ref.getDownloadURL().then(imgUrl=>{setimgURL(imgUrl)})
         }   


        task.on('state_changed',
        onProgress,
        onError,
        onComplete
        )
    }    
 },[task])



 const handleChange= (evt)=>{

    setMessage(evt.target.value)

 }

const handleSubmit= (evt)=>{
        evt.preventDefault()
        setStatus(COMPOSE_STATES.LOADING)
       //formato del tweet 
        addTlitter({
            avatar: user.avatar,
            content:message,
            userId: user.uid,
            userName: user.username,
            img:imgURL
        }).then(()=>{

            router.push('/home')
        }).catch(err=>{
            setStatus(COMPOSE_STATES.ERROR)
        })

}

//eventos Drago

const handleDragEnter=(evt)=>{
        evt.preventDefault()
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
}

const handleDragLeave=(evt)=>{
        evt.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
}

const handleDrop=(evt)=>{
        evt.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file=evt.dataTransfer.files[0];
    const task=uploadImage(file);
    setTask(task)
}


const isButtonDisabled= !message.length || status===COMPOSE_STATES.LOADING 

    return (
        <>
       
        <Head>
                <title>Crear un Tlitterr</title>
        </Head>


        <section className="form-container">

            {user &&
                <section className="avatar-container">
                <Avatar src={user.avatar}/>
                </section>
            }    
        
        
        <form onSubmit={(evt)=>handleSubmit(evt)}>  
        <textarea
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onChange={(evt)=>handleChange(evt)}
        value={message} placeholder="¿Qué esta pasando?">

        </textarea>
        {imgURL &&
        <section className="remove-img">
        <button onClick={()=>setimgURL(null)}>x</button>
        <img src={imgURL}/>
        </section> 
        }
        <div>
        <Button
        disabled={isButtonDisabled}>
        Tlitear</Button>
        </div>
        </form>
        </section>
    
        <style jsx>{`

                 div{
                    padding: 15px;
                 }   
                 section{
                    position:relative;
                 }
                 button{
                    background:rgba(0,0,0,.3);
                    position:absolute;
                    color:#fff;
                    font-size:24px;
                    right:15px;
                    top:15px;
                    border: 0;
                    border-radius:999px;
                    height:32px;
                    width:32px;

                 }
                 .form-container{  
                   
                    display: flex;
                    align-items: flex-start;
                   

                 }
                 .remove-img{
                    position: relative;
                 }

                 .avatar-container{
                    margin-top:10px;
                    padding-left:10px;
                 }   
                  img{
                    border-radius:10px;
                    height:auto;
                    width:100%;
                  }  
                textarea {
                        width:100%;
                        border:${drag===DRAG_IMAGE_STATES.DRAG_OVER ? '3px dashed #09f' : "3px solid transparent"};
                        font-size: 21px;
                        border-radius: 10px;
                        padding:15px;
                        min-height:150px;
                        resize:none;
                        outline:0;
                }
            
                `}    
        </style>
        </>
    )
}