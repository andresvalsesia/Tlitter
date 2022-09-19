import styles from '../../styles/Home.module.css';

 export default function Avatar ({alt,src}){    

    return(
        <>
        <img className={styles.avatar} alt={alt} src={src} title={alt}/>
        </>
    )

 }   