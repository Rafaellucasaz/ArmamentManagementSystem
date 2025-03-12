import { useEffect, useState } from "react";
import { Movimentacao} from "../../types/Movimentacao";
import { FaXmark } from "react-icons/fa6"
import useFormData from "@/hooks/useFormData";
import { Equipe } from "@/types/Equipe";
import { guardaService } from "@/services/guardas";
import { movimentacaoService, movimentacaoServiceDevolucao, movimentacaoServiceEmprestimo } from "@/services/movimentacoes";
import { Arma } from "@/types/Arma";
import { Guarda } from "@/types/Guarda";


interface MovimentacaoFormProps {
    handleForm: () => void;
    movimentacao:Movimentacao|null;
    armas:Arma[];
    guardas:Guarda[];
    tipo:boolean;
}

export default function MovimentacaoForm({handleForm,movimentacao,armas,guardas,tipo}: MovimentacaoFormProps){
    const {formData,setFormData,handleInput,handleSelect} = useFormData<Movimentacao>({
        armeiro_id:-1,
        data:"",
        hora:"",
        tipo:tipo,
        arma_id:-1,
        balas: 0,
        calibre:"",
        carregadores:0,
        guarda_id:-1,
        observacao: null
    })

    const [errors,setErrors] = useState({
        error: "",
        armeiro_id:"",
        data:"",
        hora:"",
        tipo:"",
        arma_id:"",
        balas:"",
        calibre:"",
        carregadores:"",
        guarda_id:"",
        
    })


    const handleClose = () => {
        setFormData({
            armeiro_id:-1,
            data:"",
            hora:"",
            tipo:tipo,
            arma_id:-1,
            balas: 0,
            calibre:"",
            carregadores:0,
            guarda_id:-1,
            observacao: null
        });
        handleForm();
    }

    const handleSubmit = async (movimentacao:Movimentacao) => {
        if(movimentacao.id){
            //update
            const response = await movimentacaoService.update(movimentacao.id,movimentacao);
            if(response.status == 422){
                setErrors(response.errors!)

            }
            else if(response.status == 200){
                handleClose();
            }
        }
        else{
            //create  
            let response;
            if(tipo){
                response = await movimentacaoServiceEmprestimo.create(movimentacao);
            }
            else{
                response = await movimentacaoServiceDevolucao.create(movimentacao);
            }
            if(response.status == 422){
                setErrors(response.errors!)

            }
            else if(response.status == 201){
                handleClose();
            }
            else{
                console.log(response);
            }
        }
    
    }

    useEffect(() => {
        if(movimentacao){
            setFormData(movimentacao);
        }

    }, [])

    return (
        <div className="w-fit h-fit top-1/4 left-auto bg-slate-100 border-2 border-slate-400 rounded-sm p-2 fixed ">
            
            <FaXmark className=" w-6 h-6 p-1 bg-red-400  hover:cursor-pointer hover:bg-red-600 rounded-md absolute right-1 " onClick={handleClose}/>
            <div className="flex flex-col gap-2 items-center">
                <h1 className="text-xl">{movimentacao ? "Editar " : "Cadastrar "}{tipo ? "Empréstimo" : "Devolução"}</h1>
                <div className="flex flex-row gap-2 justify-around items-center">
                    <div className="flex flex-col items-center w-2/4">
                        <label htmlFor="armeiro_id">Armeiro</label>
                        <select name="armeiro_id" id="armeiro_id" className="input"  value={formData.armeiro_id} onChange={handleSelect}>
                            <option value="-1" disabled>Selecione o armeiro</option>
                            {guardas.map(guarda => (
                                <option key={guarda.id} value={guarda.id}>{guarda.nome}</option>
                            ))}
                        </select>
                        {errors.armeiro_id && <p className="text-red-400">{errors.armeiro_id}</p>}
                    </div>
                    <div className="flex flex-col items-center w-2/4">
                        <label htmlFor="guarda_id">Guarda</label>
                        <select name="guarda_id" id="guarda_id" className="input"  value={formData.guarda_id} onChange={handleSelect}>
                            <option value="-1" disabled>Selecione o guarda</option>
                            {guardas.map(guarda => (
                                <option key={guarda.id} value={guarda.id}>{guarda.nome}</option>
                            ))}
                        </select>
                        {errors.armeiro_id && <p className="text-red-400">{errors.armeiro_id}</p>}
                    </div>
                </div>
                <div className="w-full flex flex-row gap-2 justify-around items-center">
                    <div className="form-field items-center">
                        <label htmlFor="data">Data</label>
                        <input type="date" name="data" id="data" className="input" value={formData.data} onChange={handleInput}/>
                        {errors.data && <p className="text-red-400">{errors.data}</p>}
                    </div>
                    <div className="form-field items-center">
                        <label htmlFor="hora">Hora</label>
                        <input type="time" name="hora" id="hora" className="input" value={formData.hora} onChange={handleInput}/>
                        {errors.hora && <p className="text-red-400">{errors.hora}</p>}

                    </div>
                </div>
                <div className=" mb-2 flex flex-col items-center w-3/4">
                    <label htmlFor="arma_id">Arma</label>
                    <select name="arma_id" id="arma_id" className="input"  value={formData.arma_id} onChange={handleSelect}>
                        <option value="-1" disabled>Selecione uma Arma</option>
                        {tipo && armas.filter(arma => !arma.emprestada).map(arma => (
                           <option key={arma.id} value={arma.id}>{arma.modelo + " Nº" + arma.registro}</option>
                        ))}
                        {!tipo && armas.filter(arma => arma.emprestada).map(arma => (
                           <option key={arma.id} value={arma.id}>{arma.modelo + " Nº" + arma.registro}</option>
                        ))}
                    </select>
                    {errors.arma_id && <p className="text-red-400">{errors.arma_id}</p>}
                </div>
                <div className="flex flex-row justify-around gap-2 items-center">
                    <div className="form-field items-center">
                        <label htmlFor="balas">Balas</label>
                        <input type="number" name="balas" id="balas" className="input"  value={formData.balas} onChange={handleInput}/>
                        {errors.balas && <p className="text-red-400">{errors.balas}</p>}
                    </div>
                    <div className="form-field items-center">
                        <label htmlFor="calibre">Calibre</label>
                        <input type="text" name="calibre" id="calibre" className="input"  value={formData.calibre} onChange={handleInput} />
                        {errors.calibre && <p className="text-red-400">{errors.calibre}</p>}
                    </div>
                    <div className="form-field items-center">
                        <label htmlFor="carregadores">Carregadores</label>
                        <input type="number" name="carregadores" id="carregadores" className="input"  value={formData.carregadores} onChange={handleInput}/>
                        {errors.carregadores && <p className="text-red-400">{errors.carregadores}</p>}

                    </div>
                   
                </div>
                {errors.error && errors.error.includes("não corresponde") && (
                        <div className="form-field items-center">
                            <label htmlFor="observacao">Justificativa</label>
                            <input type="text" name="observacao" id="observacao" className="input"  value={formData.observacao || ""} onChange={handleInput}/>
                        </div>
                    )}


                <button className=" mt-10 button p-2 rounded-sm" onClick={() => handleSubmit(formData)}>Confirmar</button>
                {errors.error && <p className="text-red-400">{errors.error}</p>}
            </div>
        </div>
    )
}