"use client"

import EquipeCard from "@/components/cards/equipe-card"
import EquipeForm from "@/components/forms/equipe-form";
import Navbar from "@/components/navBar/nav-bar"
import { equipeService } from "@/services/equipes";
import { Equipe } from "@/types/Equipe";
import { useEffect, useState } from "react";

export default function EquipesPage(){
    const [form,setForm] = useState<boolean>(false);
    const [equipe,setEquipe] = useState<Equipe|null>(null);
    const [equipes, setEquipes] = useState<Equipe[]>([]);

    const handleForm = () => {
        if(form){
            setEquipe(null);
            setForm(false);
        }
        else{
            setForm(true);
        }
    }

    const handleEdit = (equipe:Equipe) =>{
        setEquipe(equipe);
        if(!form){
            setForm(true);
        }
    }

    const handleDelete = async (id:number) => {
        const response = await equipeService.delete(id);
        if(response.status == 204){
            await fetchEquipes();
        }
        else{

        }
       
    }

    const fetchEquipes = async() => {
        const response = await equipeService.fetchAll();
        if(response.status == 200 ){
            setEquipes(response.data!);
        }
    }

    useEffect(() =>{
        fetchEquipes();
    }, [form])

   

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target;        
    }
    
    return(
        <div className="flex flex-col items-center gap-4">
            <Navbar/>
            <h1 className="mt-32 text-5xl">Equipes</h1>
            <div className="w-2/5 mt-10 p-2 flex flex-row items-center justify-between border border-slate-400">
                <input type="text" name="search" id="search" placeholder="Buscar" className="border-2 border-slate-400 p-1 rounded-sm"/>
                <button className="button h-1/2 p-2 rounded-sm" onClick={handleForm}>Cadastrar equipe</button>
            </div>
            {form && <EquipeForm equipe={equipe} handleForm={handleForm} />}
            <div className="content w-3/4 h-1/2 p-2 grid grid-cols-12 gap-2">
                {equipes.map(equipe => (
                    <EquipeCard key={equipe.id} 
                    equipe={equipe} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}/>
                ))}
                
                
            </div>
        </div>
    )
}