"use client"
import { sendEmail } from "@/services/auth";
import { useState } from "react"


export default function RecuperarPage(){
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = e.target;
        setEmail(value);
    }

    const handleSubmit = async() => {
        const response = await sendEmail(email);
        if(response.status === 200 ){
            setMessage("Enviamos instruções para recuperar a senha ao seu email")
        }
        
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className=" mt-10 mb-10 text-5xl">Recuperar senha</h1>
            {message && <p>{message}</p>}
            <div className="border-slate-400 border-2 p-2">
                <div className="form-field">
                    <label htmlFor="email">Digite o seu email</label>
                    <input type="text" name="email" id="email" value={email} onChange={handleInput} className="input"/>
                </div>

                <button onClick={handleSubmit} className=" mt-4 w-full button rounded-sm p-1 ">Mandar email com instruções</button>
            </div>
            
        </div>
    )
}