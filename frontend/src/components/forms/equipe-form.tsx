import useFormData from "@/hooks/useFormData";
import { equipeService } from "@/services/equipes";
import { Equipe } from "@/types/Equipe";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface EquipeFormProps{
    handleForm: () => void;
    equipe:Equipe|null;
}

export default function EquipeForm({equipe,handleForm}:EquipeFormProps){
    const {formData,setFormData,handleInput,handleSelect} = useFormData<Equipe>({
       nome: "",
    })

    const [errors,setErrors] = useState({
        nome: "",
    })

    const handleClose = () => {
        setFormData({
            nome: "",
        });
        handleForm();
    }

    const handleSubmit = async(equipe:Equipe) => {
        if(equipe.id){
            //update
            const response = await equipeService.update(equipe.id,equipe);
            if(response.status == 422){
                setErrors(response.errors!);
            }
            else if(response.status == 200){
                handleClose();
            }
        }
        else{
            //create  
            const response = await equipeService.create(equipe);
            if(response.status == 422){
                setErrors(response.errors!);
            }
            else if(response.status == 201){
                handleClose();
            }
        }
    }
   
    useEffect(() => {
        if(equipe){
            setFormData(equipe);
        }
    }, []);


    return(
        <div className="w-1/4 h-fit top-1/4 left-3/8 bg-slate-100 border-2 border-slate-400 rounded-sm p-2 fixed ">
            <FaXmark className=" w-6 h-6 p-1 bg-red-400  hover:cursor-pointer hover:bg-red-600 rounded-md absolute right-1 " onClick={handleClose}/>

            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-xl">{equipe ? "Editar equipe" : "Cadastrar equipe"}</h1>
                <div className="form-field w-3/4">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome" className="input" value={formData.nome} onChange={handleInput}/>
                    {errors.nome && <p className="text-red-400">{errors.nome}</p>}
                </div>

                <button className=" mt-10 button p-2 rounded-sm" onClick={() => handleSubmit(formData)}>Confirmar</button>
            </div>
        </div>
    )
}