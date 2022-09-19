import React,{useState,useEffect} from 'react'
import styles from '../../styles/Home.module.css';
import Avatar from '../../components/Icons/Avatar';
import AppLayout from '../../components/AppLayout/index';
import {fetchLatesTlitter,listenLatesTweets} from '../../firebase/client';
import useUser from '../../hooks/useUser';
import useTimeAgo from '../../hooks/useTimeAgo';
import Tweet from '../../components/Tweet/index';
import Link from 'next/link';
import Create from '../../components/Icons/Create';
import Home from '../../components/Icons/Home';
import Search from '../../components/Icons/Search';
import Head from 'next/head';


export default function HomePage (){

    const [timeline,setTimeline]=useState([])
    const user=useUser()
    

 useEffect(()=>{

     

user && fetchLatesTlitter().then(timeline=>{setTimeline(timeline);})
        
 },[user])


    return (
        <>
    
            <Head>
                <title>Inicio / Tlitter</title>
            </Head>
         <header className={styles.containerHome}>
            <h2>Inicio</h2>
         </header>
        <section className={styles.containerSection}>

        {timeline.map(
            ({ createAt, img, id, userName,avatar, content, userId }) => (
              <Tweet
                avatar={avatar}
                createAt={createAt}
                img={img}
                id={id}
                key={id}
                content={content}
                userName={userName}
                userId={userId}
              />
            )
          )}
            
        </section>
         <nav className={styles.containerNav}>
            <Link href="/home">
                <a>
                    <Home width={32} height={32} stroke="#09f"/>
                </a>
            </Link>
            <Link href="/search">
                <a>
                    <Search width={32} height={32} stroke="#09f"/>
                </a>
            </Link>
            <Link href="/compose/tweet">
                <a>
                    <Create width={32} height={32} stroke="#09f"/>
                </a>
            </Link>
         </nav>   
      

       
        </>

    )
}