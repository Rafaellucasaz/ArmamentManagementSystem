import { Equipe } from "@/types/Equipe";
import { Guarda } from "@/types/Guarda";
import { FaEdit, FaTrash } from "react-icons/fa";
interface GuardaCardProps {
    guarda:Guarda;
    equipe:Equipe;
    handleEdit: (guarda:Guarda) => void;
    handleDelete: (id:number) => void;
   
}

export default function GuardaCard({guarda,equipe,handleEdit,handleDelete}:GuardaCardProps){
    return (
        <div className="flex flex-col col-span-3 rounded-sm p-2  bg-slate-100 ">
            <div className="hover:bg-blue-200 hover:cursor-pointer rounded-sm">
                <div className=" h-10 flex items-center justify-center border-b-2 border-black overflow-hidden">
                    {guarda.nome}
                </div>
                <div className="h-20 flex flex-col border-b-2 border-black">
                    <div className="flex flex-row gap-2">
                        <p>Nº Matrícula:</p>
                        <p>{guarda.matricula}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <p>Nº Porte de arma:</p>
                        <p>{guarda.porte_arma}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <p>Equipe:</p>
                        <p>{equipe.nome}</p>
                    </div>
                
                </div>
            </div>
            
            <div className=" h-1/5 flex flex-row gap-2 justify-around items-center p-1">
                <FaEdit className="hover:text-blue-300 hover:cursor-pointer" onClick={() => handleEdit(guarda)}/>
                <FaTrash className="hover:text-red-600 hover:cursor-pointer" onClick={() => handleDelete(guarda.id!)}/>
            </div>
        </div>
    )
}