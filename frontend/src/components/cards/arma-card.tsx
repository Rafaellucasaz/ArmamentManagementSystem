import { Arma } from "@/types/Arma";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ArmaCardProps{
    arma:Arma;
    handleEdit: (arma:Arma) => void;
    handleDelete: (id:number) => void;
}

export default function ArmaCard({arma,handleEdit,handleDelete}:ArmaCardProps){

    return (
        <div className="flex flex-col col-span-3 rounded-sm p-2  bg-slate-100 ">
            <div className=" rounded-sm">
                <div className="flex items-center justify-center border-b-2 border-black ">
                    {arma.modelo}
                </div>
                <div className="flex flex-col border-b-2 border-black">
                    <div className="flex flex-row gap-2">
                        <p>Registro:</p>
                        <p>{arma.registro}</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <p>Status:</p>
                        <p>{arma.emprestada ? "Emprestada" : "Disponível"}</p>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-row gap-2 justify-around items-center p-1">
                <FaEdit className="hover:text-blue-300 hover:cursor-pointer" onClick={() => handleEdit(arma)}/>
                <FaTrash className="hover:text-red-600 hover:cursor-pointer" onClick={() => handleDelete(arma.id!)}/>
            </div>
        </div>
    )
}