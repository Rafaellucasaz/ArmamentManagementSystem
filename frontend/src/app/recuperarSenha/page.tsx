"use client"
import { sendEmail } from "@/services/auth";
import { useState } from "react"


export default function RecuperarPage(){
    const [email,setEmail] = useState("");


    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = e.target;
        setEmail(value);
    }

    const handleSubmit = async() => {
        const response = await sendEmail(email);

        console.log(response);
    }

    return (
        <div>
            <h1>Recuperar senha</h1>
            <div>
                <label htmlFor="email">Digite o seu email</label>
                <input type="text" name="email" id="email" value={email} onChange={handleInput}/>
            </div>

            <button onClick={handleSubmit}>Mandar email com instruções</button>
        </div>
    )
}