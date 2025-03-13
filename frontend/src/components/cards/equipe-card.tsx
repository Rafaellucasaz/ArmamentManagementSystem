import { Equipe } from "@/types/Equipe";


interface EquipeCardProps{
   equipe:Equipe;
   handleEdit: (equipe:Equipe) => void;
   handleDelete: (id:number) => void;
}
export default function EquipeCard({equipe,handleEdit,handleDelete}:EquipeCardProps){

    return (
        <div className="flex flex-col gap-3 col-span-2 border-b-2 border-black">
            <div className="flex items-center justify-center  rounded-sm text-lg">
                {equipe.nome}
            </div>
            <div className="flex flex-row justify-around">
                <img src="edit-pen-svgrepo-com.svg" alt="Editar" className="edit-icon w-8 h-6" onClick={() => handleEdit(equipe)}/>
                <img src="trash-delete-bin-svgrepo-com.svg" alt="Deletar" className="trash-icon w-8 h-6 " onClick={() => handleDelete(equipe.id!)}/>
                
            </div>
        </div>
    )
}