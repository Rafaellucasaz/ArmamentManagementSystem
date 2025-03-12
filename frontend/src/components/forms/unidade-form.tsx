import useFormData from "@/hooks/useFormData";
import { unidadeService } from "@/services/unidades";
import { Unidade } from "@/types/Unidade";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface UnidadeFormProps{
    handleForm: () => void;
    unidade:Unidade|null;
   
}

export default function UnidadeForm({unidade,handleForm}:UnidadeFormProps){
    const {formData,setFormData,handleInput,handleSelect} = useFormData<Unidade>({
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

    const handleSubmit = async(unidade:Unidade) => {
        
        if(unidade.id){
            //update
            const response = await unidadeService.update(unidade.id,unidade);
            if(response.status == 422){
                setErrors(response.errors!);
            }
            else if(response.status == 200){
                handleClose();
            }
        }
        else{
            //create  
            const response = await unidadeService.create(unidade);
            if(response.status == 422){
                setErrors(response.errors!);
            }
            else if(response.status == 201){
                handleClose();
            }
           
        }
    
    }
   
    useEffect(() => {
        if(unidade){
            setFormData(unidade);
        }
    }, []);


    return(
        <div className="w-1/4 h-fit top-1/4 left-3/8 bg-slate-100 border-2 border-slate-400 rounded-sm p-2 fixed ">
            <FaXmark className=" w-6 h-6 p-1 bg-red-400  hover:cursor-pointer hover:bg-red-600 rounded-md absolute right-1 " onClick={handleClose}/>

            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-xl">{unidade ? "Editar unidade" : "Cadastrar unidade"}</h1>
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