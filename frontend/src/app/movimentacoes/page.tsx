"use client"

import MovimentacaoCard from "@/components/cards/movimentacao-card";
import MovimentacaoForm from "@/components/forms/movimentacao-form";
import MovimentacaoModal from "@/components/modals/movimentacao-modal";
import Navbar from "@/components/navBar/nav-bar"
import { armaService } from "@/services/armas";
import { guardaService } from "@/services/guardas";
import { movimentacaoService } from "@/services/movimentacoes";
import { Arma } from "@/types/Arma";
import { Guarda } from "@/types/Guarda";
import { Movimentacao } from "@/types/Movimentacao";
import { useEffect, useState } from "react";


export default function MovimentacoesPage(){

    const [form,setForm] = useState<boolean>(false);
    const [modal,setModal] = useState<boolean>(false);
    const [movimentacao,setMovimentacao] = useState<Movimentacao|null>(null);
    const [tipo,setTipo] = useState<boolean>(false);
    const [guardas,setGuardas] = useState<Guarda[]>([]);
    const [armas,setArmas] = useState<Arma[]>([]);
    const [movimentacoes,setMovimentacoes] = useState<Movimentacao[]>([]);
    const handleForm = () => {
        if(form){
            setMovimentacao(null);
            setForm(false);
        }
        else{
            setForm(true);
        }
    }

    const handleModal = (movimentacao:Movimentacao|null) => {
        setMovimentacao(movimentacao);
        setModal(!modal);
    }



    const fetchMovimentacoes = async() => {
        const response = await movimentacaoService.fetchAll();
        if(response.status == 200){
            setMovimentacoes(response.data!);
        }
    }
    const fetchGuardas = async () => {
        const response = await guardaService.fetchAll();
        if(response.status == 200){
            setGuardas(response.data!);
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

    useEffect(() => {
        fetchGuardas();
    },[])

    useEffect(() => {
        fetchArmas();
        fetchMovimentacoes();
    }, [form])

    const isDataReady = armas.length > 0 && guardas.length > 0 && movimentacoes.length > 0;

    return(
        <div className="flex flex-col items-center gap-4">
            <Navbar/>
            
            <h1 className="mt-32 text-5xl">Movimentações</h1>
            <div className="w-2/5 mt-10 p-2 flex flex-row items-center justify-between border border-slate-400">
                <input type="text" name="search" id="search" placeholder="Buscar" className="border-2 border-slate-400 p-1 rounded-sm"/>
                <button className="button h-1/2 p-2 rounded-sm" onClick={() => {setTipo(true);handleForm()}}>Cadastrar Empréstimo</button>
                <button className="button h-1/2 p-2 rounded-sm" onClick={() => {setTipo(false); handleForm()}}>Cadastrar Devolução</button>
            </div>
            {form && <MovimentacaoForm handleForm={handleForm} 
            movimentacao={movimentacao} 
            armas={armas} 
            guardas={guardas} 
            tipo={tipo}/> }
            
            {modal && movimentacao && <MovimentacaoModal movimentacao={movimentacao} 
            armeiro={guardas.find(guarda => guarda.id == movimentacao?.arma_id)!} 
            guarda={guardas.find(guarda =>(guarda.id == movimentacao.guarda_id))!}
            arma={armas.find(arma => (arma.id == movimentacao.arma_id))!}
            handleModal={handleModal}/>}
            {isDataReady && (
                <div className="content w-11/12 h-1/2 p-2  grid grid-cols-12 gap-2">
                {movimentacoes.map(movimentacao => (
                    <MovimentacaoCard  key={movimentacao.id} 
                    movimentacao={movimentacao} 
                    armeiro={guardas.find(guarda => (guarda.id == movimentacao.armeiro_id))!}
                    arma={armas.find(arma => (arma.id == movimentacao.arma_id))!}
                    guarda={guardas.find(guarda =>(guarda.id == movimentacao.guarda_id))!}
                    handleModal={handleModal}/>
                ))}
                </div>
            )}
          
        </div>
    )
}