import { colors } from "../../styles/theme"


export default function Button({children,disabled,onClick}){
    return (
        <>
            <button disabled={disabled} onClick={onClick}>
                {children}
            </button>

            <style jsx>{`
                 button{
                    margin-top: 5px;
                    background-color: ${colors.black};
                    border:0;
                    color:#fff;
                    cursor:pointer;
                    font-size:16px;
                    border-radius: 9999px;
                    font-weight: 800;
                    display:flex;
                    align-items:center;
                    padding: 8px 24px;
                    transition: opacity 0.3s ease;  
                 }

                 button[disabled]{
                    opacity: 0.2;
                    pointer-events: none;
                 }

                 button > :global(svg){
                    margin-right:8px;
                 }
                 button:hover{
                    opacity: 0.7;
                    
                 }
                `}
            </style>
        </>
    )
}