import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6"
import { Arma } from "@/types/Arma";
import useFormData from "@/hooks/useFormData";
import { armaService } from "@/services/armas";


interface GuardaFormProps {
    handleForm: () => void;
    arma:Arma|null;
}

export default function ArmaForm({handleForm,arma}: GuardaFormProps){
    const {formData,setFormData,handleInput,handleSelect} = useFormData<Arma>({
        modelo: "",
        registro: "",
        emprestada: false
    })

    const [errors,setErrors] = useState({
        modelo: "",
        registro: "",
    })

    const handleClose = () => {
        setFormData({
            modelo: "",
            registro: "",
            emprestada:false
        });
        handleForm();
    }

    useEffect(() => {
        if(arma){
            setFormData(arma);
        }

    }, [])
    const handleSubmit = async (arma:Arma) => {
        if(arma.id){
            //update
            const response = await armaService.update(arma.id,arma);
            if(response.status == 422){
                setErrors(response.errors!);
            }
            else if(response.status == 200){
                handleClose();
            }
        }
        else{
            //create  
            const response = await armaService.create(arma);
            if(response.status == 422){
                setErrors(response.errors!);
            }
            else if(response.status == 201){
                handleClose();
            }
        }
    
    }

    return (
        <div className="w-1/4 h-fit top-1/4 left-3/8 bg-slate-100 border-2 border-slate-400 rounded-sm p-2 fixed ">
            
            <FaXmark className=" w-6 h-6 p-1 bg-red-400  hover:cursor-pointer hover:bg-red-600 rounded-md absolute right-1 " onClick={handleClose}/>
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-xl">{arma ? "Editar arma" : "Cadastrar arma"}</h1>
                <div className="form-field w-3/4">
                    <label htmlFor="modelo">Modelo</label>
                    <input type="text" name="modelo" id="modelo" className="input" value={formData.modelo} onChange={handleInput}/>
                    {errors.modelo && <p className="text-red-400">{errors.modelo}</p>}

                </div>
                <div className="form-field w-3/4">
                    <label htmlFor="registro">Registro</label>
                    <input type="text" name="registro" id="registro" className="input" value={formData.registro} onChange={handleInput}/>
                    {errors.registro && <p className="text-red-400">{errors.registro}</p>}

                </div>
                <button className=" mt-10 button p-2 rounded-sm" onClick={() => handleSubmit(formData)}>Confirmar</button>
                
            </div>
        </div>
    )
}