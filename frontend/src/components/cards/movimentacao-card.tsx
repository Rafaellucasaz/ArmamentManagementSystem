import { Arma } from "@/types/Arma";
import { Equipe } from "@/types/Equipe";
import { Guarda } from "@/types/Guarda";
import { Movimentacao } from "@/types/Movimentacao";
import { FaEdit, FaTrash } from "react-icons/fa";
interface MovimentacaoCardProps {
    movimentacao:Movimentacao;
    armeiro:Guarda;
    arma:Arma;
    guarda:Guarda;
    // handleEdit: (movimentacao:Movimentacao) => void;
    // handleDelete: (id:number) => void;
    handleModal: (movimentacao:Movimentacao|null) => void;
}

export default function MovimentacaoCard({movimentacao,armeiro,arma,guarda,handleModal}:MovimentacaoCardProps){
    return (
        <div className="flex flex-col col-span-3  hover:bg-blue-200 hover:cursor-pointer rounded-sm p-2 text-xs bg-slate-100 " onClick={() => handleModal(movimentacao)}>
            <div className="h-3/4  rounded-sm">
                <div className="h-1/4 flex items-center justify-center border-b-2 border-black">
                    <p>Movimentação Nº {movimentacao.id}</p>
                </div>
                <div className=" h-3/4 flex flex-row border-b-2 border-black">
                    <div className=" w-1/3 h-full flex flex-col justify-start text-center gap-1">
                        <p>Armeiro</p>
                        <p>{armeiro.nome}</p>
                    </div>
                    <div className="w-1/3 h-full flex flex-col justify-start  text-center gap-1">
                        <p>guarda</p>
                        <p>{guarda.nome}</p>
                       
                    </div>
                    <div className="w-1/3 h-full flex flex-col justify-start  text-center gap-1">
                        <p>Arma</p>
                        <p>{arma.modelo}</p>
                        <p>Nº {arma.registro}</p>                       
                    </div>
                    {/* <div className="flex flex-col gap-1">
                        <p>Munição</p>
                        <div className="flex flex-col">
                            <p>Calibre: {movimentacao.calibre}</p>
                            <p>Balas.: {movimentacao.balas}</p>
                            <p>Carregadores: {movimentacao.carregadores}</p>
                        </div>
                    </div> */}
                </div>
            </div>
            
            <div className="h-1/4 flex flex-row justify-around items-center p-1">
                {movimentacao.tipo ? "Empréstimo" : "Devolução"}
            </div>
        </div>
    )
}