"use client"
import NavBar from "@/components/navBar/nav-bar";


export default function UsuarioPage(){

    return(
        <div className="flex flex-col items-center gap-4">
            <NavBar/>
            <h1 className="mt-32 text-5xl">Informações de usuário</h1>

            <div className="w-1/2 h-1/2 bg-slate-200 border-2 border-slate-400">
                <div className="form-field">
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className="form-field">

                </div>
                <div className="form-field">

                </div>
                <div className="form-field">

                </div>
                <div className="form-field">

                </div>
            </div>
        </div>
    )
}