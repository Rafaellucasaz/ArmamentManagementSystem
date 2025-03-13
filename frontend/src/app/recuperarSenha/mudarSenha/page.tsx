"use client"

import useFormData from "@/hooks/useFormData"
import { resetPassword } from "@/services/auth";
import { changePassword } from "@/types/User"
import { setuid } from "process";
import { useEffect, useState } from "react";

export default function MudarSenha(){
    const {formData,setFormData,handleInput,handleSelect} = useFormData<changePassword>({
        password: "",
        password_confirmation: ""
    })
    const [accessToken,setAccesstoken] = useState("");
    const [client,setClient] = useState("");
    const [uid,setUid] = useState("");

    const handleSubmit = async() =>{
        const response = await resetPassword(formData,accessToken,uid,client);
        if(response.status === 200){
            window.location.href = "/"
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);

            const accessToken = urlParams.get("access-token");
            const client = urlParams.get("client");
            const uid = urlParams.get("uid");

            if (accessToken) setAccesstoken(accessToken);
            if (client) setClient(client);
            if (uid) setUid(uid);
        }
    }, []);

    return(
        <div className="flex flex-col items-center">
            <h1 className="mt-10 mb-10 text-5xl">Mudar senha</h1>
            <div className="border-slate-400 border-2">
                <div className="p-2">
                   <div className="form-field">
                        <label htmlFor="password">Nova senha</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleInput} className="input"/>
                   </div>
                   <div className="form-field">
                    <label htmlFor="password_confirmation">confirmar nova senha</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" value={formData.password_confirmation} onChange={handleInput} className="input"/>
                   </div>
                </div>

                <button onClick={handleSubmit} className="w-full button rounded-sm p-1 ">Confirmar</button>
            </div>

        </div>
    )
}