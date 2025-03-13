"use client"
import { login } from "@/services/auth";
import { useState } from "react";

export default function Home() {


  const [formData,setFormData] = useState({
    email: "",
    password: "",
  })
  

  const [error,setError] = useState("");
  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) =>{
    
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }


 

  const handleSubmit = async() => {
    const response = await login(formData.email,formData.password);
    if(response.status == 200){
     
      if(response.data?.data.first_login){
        window.location.href = '/usuario';
      }
      else{
        window.location.href = '/movimentacoes';
      }
    }
    else{
      setError("Email e/ou senha incorreta")
    }
  }

  

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <h1 className=" mb-10 text-5xl">Login</h1>
      {error && <p className="text-red-400">{error}</p>}
      <div className=" w-3/4 h-2/3 flex flex-row items-center justify-around border-2 border-slate-300">
          <div className="border-2 border-slate-300 rounded-sm">
            <img src="guarda_civil.jpeg" alt="Logo da guarda civil" />
          </div>
          <div className=" h-4/5 flex flex-col items-center border-2 gap-4 border-slate-300 p-16">
            <div className="flex flex-col gap-4 items-start">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="border-2 border-slate-400" value={formData.email} onChange={handleForm}/>
            </div>
            <div className="flex flex-col gap-4 items-start">
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" id="password" className="border-2 border-slate-400" value={formData.password} onChange={handleForm} />
            </div>
            <div className="flex items-center">
                <button className=" w-full button rounded-sm p-1 " onClick={handleSubmit}>Entrar</button>
            </div>

            <a  href={"/recuperarSenha"} className=" underline text-blue-500 hover:text-blue-200">Esqueceu a senha?</a>
          </div>
      </div>
    </div>
  );
}
