import { useEffect, useState } from "react";
import { Guarda} from "../../types/Guarda";
import { FaXmark } from "react-icons/fa6"
import useFormData from "@/hooks/useFormData";
import { Equipe } from "@/types/Equipe";
import { guardaService } from "@/services/guardas";


interface GuardaFormProps {
    handleForm: () => void;
    guarda:Guarda|null;
    equipes:Equipe[];
}

export default function GuardaForm({handleForm,guarda,equipes}: GuardaFormProps){
    const {formData,setFormData,handleInput,handleSelect} = useFormData<Guarda>({
        nome: "",
        matricula: "",
        porte_arma: "",
        equipe_id: 0
    })

    const [errors,setErrors] = useState({
        nome: "",
        matricula: "",
        porte_arma: "",
        equipe_id: ""
    })


    const handleClose = () => {
        setFormData({
            nome: "",
            matricula: "",
            porte_arma: "",
            equipe_id: 0
        });
        handleForm();
    }

    const handleSubmit = async (guarda:Guarda) => {
        if(guarda.id){
            //update
            const response = await guardaService.update(guarda.id,guarda);
            if(response.status == 422){
                setErrors(response.errors!)

            }
            else if(response.status == 200){
                handleClose();
            }
        }
        else{
            //create  
            const response = await guardaService.create(guarda);
            if(response.status == 422){
                setErrors(response.errors!)

            }
            else if(response.status == 201){
                handleClose();
            }
        }
    
    }

    useEffect(() => {
        if(guarda){
            setFormData(guarda);
        }

    }, [])

    return (
        <div className="w-fit h-fit top-1/4 left-3/8 bg-slate-100 border-2 border-slate-400 rounded-sm p-2 fixed ">
            
            <FaXmark className=" w-6 h-6 p-1 bg-red-400  hover:cursor-pointer hover:bg-red-600 rounded-md absolute right-1 " onClick={handleClose}/>
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-xl">{guarda ? "Editar guarda" : "Cadastrar guarda"}</h1>
                <div className="form-field w-3/4">
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome" className="input" value={formData.nome} onChange={handleInput}/>
                    {errors.nome && <p className="text-red-400">{errors.nome}</p>}
                </div>
                <div className="flex flex-row justify-around items-center">
                    <div className="form-field items-center">
                        <label htmlFor="matricula" className="text-sm">Nº de matrícula</label>
                        <input type="text" name="matricula" id="matricula" className="input w-1/3" value={formData.matricula} onChange={handleInput}/>
                        {errors.matricula && <p className="text-red-400 text-xs">{errors.matricula}</p>}

                    </div>
                    <div className="form-field items-center">
                        <label htmlFor="porte_arma" className="text-sm">Nº de porte de arma</label>
                        <input type="text" name="porte_arma" id="porte_arma" className="input w-1/3" value={formData.porte_arma} onChange={handleInput}/>
                        {errors.porte_arma && <p className="text-red-400 text-xs">{errors.porte_arma}</p>}
                    </div>
                </div>

                <div className="form-field w-3/4">
                    <label htmlFor="equipe_id">Equipe</label>
                    <select name="equipe_id" id="equipe_id" className="input"  value={formData.equipe_id} onChange={handleSelect}>
                        <option value="0" disabled>Selecione uma Equipe</option>
                        {equipes.map(equipe => (
                            <option key={equipe.id} value={equipe.id}>{equipe.nome}</option>
                        ))}
                    </select>
                    {errors.equipe_id && <p className="text-red-400">{errors.equipe_id}</p>}
                </div>

                <button className=" mt-10 button p-2 rounded-sm" onClick={() => handleSubmit(formData)}>Confirmar</button>
                
            </div>
        </div>
    )
}