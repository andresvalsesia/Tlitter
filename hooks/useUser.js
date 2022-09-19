import React,{useEffect,useState} from 'react'
import {onAuthStateChanged} from '../firebase/client';
import {useRouter} from 'next/router';

export default function useUser(){
    const [user,setUser]=useState(undefined)

    useEffect(() => {
        onAuthStateChanged(setUser)
    }, [])

    useEffect(() => {
       user===null && router.push('/') 
    }, [user])

    return user
}