import { Unidade } from "@/types/Unidade"

interface UnidadeCardProps{
   unidade:Unidade;
   handleEdit: (unidade:Unidade) => void;
   handleDelete: (id:number) => void;
}
export default function UnidadeCard({unidade,handleEdit, handleDelete}:UnidadeCardProps){

    return (
        <div className="flex flex-col gap-3 col-span-2 border-b-2 border-black">
            <div className="flex items-center justify-center hover:bg-blue-200 hover:cursor-pointer rounded-sm text-lg">
                {unidade.nome}
            </div>
            <div className="flex flex-row justify-around">
                <img src="edit-pen-svgrepo-com.svg" alt="Editar" className="edit-icon w-8 h-6" onClick={() => handleEdit(unidade)}/>
                <img src="trash-delete-bin-svgrepo-com.svg" alt="Deletar" className="trash-icon w-8 h-6 " onClick={() => handleDelete(unidade.id!)}/>
                
            </div>
        </div>
    )
}