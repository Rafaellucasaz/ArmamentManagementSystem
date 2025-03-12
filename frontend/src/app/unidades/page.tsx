"use client"

import Navbar from "@/components/navBar/nav-bar"

import { useEffect, useState } from "react"
import { Unidade } from "@/types/Unidade"
import UnidadeCard from "@/components/cards/unidade-card"
import UnidadeForm from "@/components/forms/unidade-form"
import { unidadeService } from "@/services/unidades"

export default function UnidadesPage() {

    const [form,setForm] = useState<boolean>(false);
    const [unidade,setUnidade] = useState<Unidade|null>(null);
    const [unidades,setUnidades] = useState<Unidade[]>([]);

    const handleForm = () => {
        if(form){
            setUnidade(null);
            setForm(false);
        }
        else{
            setForm(true);
        }
    }

    const handleEdit = (unidade:Unidade) =>{
        setUnidade(unidade);
        if(!form){
            setForm(true);
        }
    }

    const handleDelete = async (id:number) => {
        const response = await unidadeService.delete(id);
        if(response.status == 204){
            await fetchUnidades()
        }
        else{

        }
       
    }

    const handleSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target;

        
    }

    const fetchUnidades = async() => {
        const response = await unidadeService.fetchAll();
        if(response.status == 200){
            setUnidades(response.data!);
        }
    }

    useEffect(() =>{
        fetchUnidades()
    }, [form])
    return (
        <div className="flex flex-col items-center gap-4">
            <Navbar/>
            <h1 className="mt-32 text-5xl">Unidades</h1>
            <div className="w-2/5 mt-10 p-2 flex flex-row items-center justify-between border border-slate-400">
                <input type="text" name="search" id="search" placeholder="Buscar" className="border-2 border-slate-400 p-1 rounded-sm"/>
                <button className="button h-1/2 p-2 rounded-sm" onClick={handleForm}>Cadastrar unidade</button>
            </div>
            {form && <UnidadeForm unidade={unidade} handleForm={handleForm} />}
            <div className="content w-3/4 h-1/2 p-2 grid grid-cols-12 gap-2">
                {unidades.map(unidade => (
                    <UnidadeCard key={unidade.id} 
                    unidade={unidade} 
                    handleEdit={handleEdit} 
                    handleDelete={handleDelete}/>
                ))}
            </div>
        </div>
    )
}