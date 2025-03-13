"use client"
import NavBar from "@/components/navBar/nav-bar";
import useFormData from "@/hooks/useFormData";
import { editUser, getUser } from "@/services/user";
import { EditUser } from "@/types/User";
import { useEffect, useState } from "react";


export default function UsuarioPage(){

    const {formData,setFormData,handleInput,handleSelect} = useFormData<EditUser>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })

    const [message,setMessage] = useState("")


    const fetchUser = async() => {
        const response = await getUser();

        setFormData((prevData) => ({
            ...prevData,
            name: response.data?.name!,
            email: response.data?.email!,
          }));
    }

    const handleSubmit = async() => {
        const response = await editUser(formData);

        if(response.status == 200){
            setMessage("Senha atualizada!")
            setFormData((prevData) => ({
                ...prevData,
                password: "",
                password_confirmation: ""
            }))
        }
        
        
    }

    useEffect(() =>{
        fetchUser();
    },[])



    return(
        <div className="flex flex-col items-center gap-4">
            <NavBar/>
            <h1 className="mt-32 text-5xl">Informações de usuário</h1>
            {message && <p className="text-blue-400">{message}</p>}
            <div className="w-1/4 h-1/2 rounded-sm p-4 border-2 border-slate-400">
                <div className="form-field">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" className="input" value={formData.name} onChange={handleInput}/>
                </div>
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" className="input" value={formData.email} onChange={handleInput}/>
                </div>
                <div className="form-field">
                    <label htmlFor="password">Senha Nova</label>
                    <input type="password" name="password" id="password" className="input" value={formData.password} onChange={handleInput}/>
                </div>
                <div className="form-field">
                    <label htmlFor="password_confirmation">Confirmar nova senha</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" className="input" value={formData.password_confirmation} onChange={handleInput}/>
                </div>
               
                <div className=" w-full flex justify-center items-center">
                    <button className=" mt-10 button p-2 rounded-sm" onClick={handleSubmit}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}