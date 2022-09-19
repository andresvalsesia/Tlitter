
import React, {useState,useEffect} from 'react';

const DATE_UNITS=[
    ['day',86400],
    ['hour',3600],
    ['minute',60],
    ['second',1]
]

const getDateDiffs= timestamp =>{

    const now = Date.now()
    const elapsed = (timestamp-now) /1000;

    for(const [unit,secondsUnist] of DATE_UNITS){

            if(Math.abs(elapsed) > secondsUnist || unit === 'second'){
                const value= Math.round(elapsed/secondsUnist)
                return {value,unit}
            }
    }

}

export default function useTimeAgo (timestamp){
      const [timeago,setTimeago]=useState(()=>getDateDiffs(timestamp))

  useEffect(() => {
  const interval = setInterval(() => {
        const newTimeAgo= getDateDiffs(timestamp)
        setTimeago(newTimeAgo)
     }, 5000)

     return ()=> clearInterval(interval)

  },[timestamp])

         
  const rtf= new Intl.RelativeTimeFormat('es',{
    style:"long"})  

    const {value,unit}=timeago  

      return rtf.format(value,unit)

      

}