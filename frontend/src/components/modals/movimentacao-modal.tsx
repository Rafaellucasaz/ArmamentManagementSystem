import { Arma } from "@/types/Arma";
import { Guarda } from "@/types/Guarda";
import { Movimentacao } from "@/types/Movimentacao";
import { FaXmark } from "react-icons/fa6";

interface MovimentacaoModalProps{
    movimentacao:Movimentacao;
    armeiro:Guarda;
    guarda:Guarda;
    arma:Arma;
    handleModal: (movimentacao:Movimentacao|null) => void;
}

export default function MovimentacaoModal({movimentacao,armeiro,guarda,arma,handleModal}:MovimentacaoModalProps){


    return (
        <div className="w-1/2 h-1/2 top-1/4 pt-16 flex flex-row flex-wrap justify-between bg-slate-100 border-2 border-slate-400 rounded-sm  fixed">
            <FaXmark className=" w-6 h-6 p-1 bg-red-400  hover:cursor-pointer hover:bg-red-600 rounded-md absolute right-1 top-1 z-50" onClick={() => handleModal(null)}/>
                <h2 className="w-full text-center top-1 left-auto absolute ">Movimentação Nº {movimentacao.id}</h2>
            <div className=" w-1/3 flex flex-col items-center border-b-2 border-black">
                <p className=" w-full text-center border-b-2 border-black">Armeiro</p>
                <div className="w-full p-1 flex flex-col ">
                    <p>Nome: {armeiro.nome}</p>
                    <p>Nº Mat.: {armeiro.matricula}</p>
                </div>
            </div>
            <div className=" w-1/3 flex flex-col  border-b-2 border-black">
                <p className=" w-full text-center border-b-2 border-black">Guarda</p>
                <div className="h-full p-1 flex flex-col border-l-2 border-r-2  border-black">
                    <p>Nome: {guarda.nome}</p>
                    <p>Nº Mat.: {guarda.matricula}</p>
                    <p>Nº Porte de arma: {guarda.porte_arma}</p>
                </div>
            </div>
            <div className="w-1/3 flex flex-col border-b-2 border-black">
                <p className=" w-full text-center border-b-2 border-black">Arma</p>
                <div className=" p-1 flex flex-col">
                    <p>Modelo: {arma.modelo}</p>
                    <p>Registro: {arma.registro}</p>
                </div>
            </div>
            <div className="w-1/3 flex flex-col">
                <p className=" w-full text-center border-b-2 border-black">Municao</p>
                <div className=" h-full flex flex-col p-1 border-r-2 border-black">
                    <p>balas: {movimentacao.balas}</p>
                    <p>Calibre: {movimentacao.calibre}</p>
                    <p>Carregadores: {movimentacao.carregadores}</p>
                </div>
            </div>
            <div className=" w-1/3 flex flex-col ">
                <p className=" w-full text-center border-b-2 border-black">Data</p>
                <div className=" p-1 flex flex-col">
                   <p>Data:{new Date(movimentacao.data).toLocaleDateString('pt-BR')}</p>
                   <p>Hora:{new Date(movimentacao.hora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            </div>
            <div className="w-1/3 flex flex-col ">
                <p className="w-full text-center border-b-2 border-black">Observação/justificativa</p>
                <div className="h-full p-1 border-l-2 border-black">
                    { movimentacao.observacao  ? movimentacao.observacao: ""}
                </div>
            </div>
            
            <p className=" w-full text-center top-8 left-auto  border-b-2 border-t-2 border-black absolute"> {movimentacao.tipo ? "Empréstimo" : "Devolução"}</p>
        </div>
    )
}