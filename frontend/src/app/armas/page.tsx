"use client"

import { useEffect, useState } from "react";
import Navbar from "@/components/navBar/nav-bar";
import { Arma } from "@/types/Arma";
import ArmaCard from "@/components/cards/arma-card";
import ArmaForm from "@/components/forms/arma-form";
import { armaService } from "@/services/armas";

export default function ArmasPage(){
    const [form,setForm] = useState<boolean>(false);
    const [arma,setArma] = useState<Arma|null>(null);
    const [armas,setArmas] = useState<Arma[]>([]);
    
    const handleForm = () => {
        if(form){
            setArma(null);
            setForm(false);
        }
        else{
            setForm(true);
        }
    }

    const handleEdit = (arma:Arma) =>{
        setArma(arma);
        if(!form){
            setForm(true);
        }
    }

    const handleDelete = async (id:number) => {
        const response = await armaService.delete(id);
        if(response.status == 204){
            await fetchArmas();
        }
        else{

        }
       
    }
    const fetchArmas = async() => {
        const response = await armaService.fetchAll();
        if(response.status == 200){
            setArmas(response.data!);
        }
        else{

        }
    }


    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target;        
    }

    useEffect(() =>{
        fetchArmas();
    }, [form])
    return(
        <div className="flex flex-col items-center gap-4">
            <Navbar />
            <h1 className="mt-32 text-5xl">Armas</h1>

            <div className="w-2/5 mt-10 p-2 flex flex-row items-center justify-between border border-slate-400">
                <input type="text" name="search" id="search" placeholder="Buscar" className="border-2 border-slate-400 p-1 rounded-sm"/>
                <button className="button h-1/2 p-2 rounded-sm" onClick={handleForm}>Cadastrar Arma</button>
            </div>
            {form && <ArmaForm handleForm={handleForm} arma={arma} />}
            <div className="content w-3/4 h-1/2 p-2 grid grid-cols-12 gap-2">
                {armas.map(arma => (
                    <ArmaCard key={arma.id} 
                    arma={arma} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}/>
                ))}
            </div>
        </div>
    )
}