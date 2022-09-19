import React,{useState,useEffect} from 'react';
import Head from 'next/head'
import AppLayout from '../components/AppLayout/index';
import Button from '../components/Button';
import GitHub from '../components/Icons/GitHub';
import Link from 'next/link'
import {fonts,colors,breakpoint} from '../styles/theme';
import {loginWithGithub,onAuthStateChanged} from '../firebase/client';
import {useRouter} from 'next/router'

export default function Home() {

const [user,setUser]=useState(null);
const router=useRouter();

useEffect(() => {
  
  onAuthStateChanged(setUser)
 
}, [])

useEffect(() => {
  user && router.replace('/home')
},[user])


const handleClick=() => {
  loginWithGithub()
    .catch(error =>{console.log(error)})
};


  return (
    <>

      <Head>
        <title>Tlitter</title>
       
        <link rel="icon" href="/favicon.ico" />
      </Head>


   
  
        <section>
          <img src="/twitter-logo-3.png"/>
          <h1>Tlitter</h1>
           <h2>Talk about development with developers</h2>
          
          {user===null &&
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={23} height={23 }/>
              Login with GitHub
            </Button>
             
          }

          {user===undefined && <img src="/spinner.gif" />}
          
            
            
             
         </section>   
    
  
     

      <style jsx>
        {`
          div{
            display: grid;
            height:100vh;
            place-items:center;
          }
          main{
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            height:100%;
            width: 100%;
          }
          section{
            display:grid;
            height:100%;
            place-items:center;
            place-content:center;
          }
          img{
            width:120px;
          }
          h1{
            color: ${colors.primary};
            font-weight: 800;
            margin-bottom:0;
          }
          h2{
            color: ${colors.secondary};
            font-size:21px;
            margin:0;
          }
          @media (min-width:${breakpoint.mobile}){
            main{
              height: 90vh;
              width: ${breakpoint.mobile};
            }
          }        
        `}
        
      </style>

      <style jsx global>
        {`
          html,body{
            background-image:
             radial-gradient(${colors.primary} 1px , transparent 1px),
             radial-gradient(${colors.primary} 1px , transparent 1px);
            background-position:0 0, 25px 25px;
            background-size: 50px 50px;
            padding:0;
            overflow: hidden;
            margin:0;
            font-family:${fonts.base}
           
          }

          *{
            box-sizing: border-box;
          }
          textarea,input{
            font-family: ${fonts.base}
          }
        `}

      </style>

    </> 
  )
}
