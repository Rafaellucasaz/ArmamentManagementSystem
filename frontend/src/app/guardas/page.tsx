"use client"

import GuardaCard from "@/components/cards/guarda-card";
import GuardaForm from "@/components/forms/guarda-form";
import Navbar from "@/components/navBar/nav-bar";
import ProtectedRoute from "@/components/protectedRoute";
import { equipeService } from "@/services/equipes";
import { guardaService } from "@/services/guardas";
import { Equipe } from "@/types/Equipe";
import { Guarda } from "@/types/Guarda";
import { useEffect, useState } from "react";

export default function GuardasPage(){

    const [form,setForm] = useState<boolean>(false);
    const [guarda,setGuarda] = useState<Guarda|null>(null);
    const [guardas,setGuardas] = useState<Guarda[]>([]);
    const [equipes,setEquipes] = useState<Equipe[]>([]);
    const handleForm = () => {
        if(form){
            setGuarda(null);
            setForm(false);
        }
        else{
            setForm(true);
        }
        
    }
    const handleEdit = (guarda:Guarda) =>{
        setGuarda(guarda);
        if(!form){
            setForm(true);
        }
    }

  

    const handleDelete = async (id:number) => {
        const response = await guardaService.delete(id);
        if(response.status == 204){
            await fetchGuardas()
        }
        else{

        }
       
    }

    const fetchEquipes = async () => {
        const response = await equipeService.fetchAll();
        if(response.status == 200){
            setEquipes(response.data!);
        }
    }

    const fetchGuardas = async () => {
        const response = await guardaService.fetchAll();
        if(response.status == 200){
            setGuardas(response.data!);
        }
    }

    useEffect( () =>{
        fetchEquipes();
    },[])

    useEffect(() => {
        fetchGuardas();
    }, [form])

    const isDataReady =   guardas.length > 0 && equipes.length > 0;
    return(
        <ProtectedRoute>
            <div className="flex flex-col items-center gap-4">
                <Navbar/>
                <h1 className="mt-32 text-5xl">Guardas</h1>

                <div className="w-2/5 mt-10 p-2 flex flex-row items-center justify-between border border-slate-400">
                    <input type="text" name="search" id="search" placeholder="Buscar" className="border-2 border-slate-400 p-1 rounded-sm"/>
                    <button className="button h-1/2 p-2 rounded-sm" onClick={handleForm}>Cadastrar Guarda</button>
                </div>
                {form && <GuardaForm handleForm={handleForm}  guarda={guarda} equipes={equipes}/>}
                {isDataReady && (
                    <div className="content w-3/4 h-1/2 p-2 grid grid-cols-12 gap-2">
                        {guardas.map(guarda => (
                            <GuardaCard key={guarda.id} 
                            guarda={guarda} 
                            equipe={equipes.find(equipe => (equipe.id === guarda.equipe_id))!} 
                            handleEdit={handleEdit} 
                            handleDelete={handleDelete}/>
                        ))}
                    </div>
                )}
        
            </div>
        </ProtectedRoute>
        
    )
}