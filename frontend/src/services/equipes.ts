import { Equipe, EquipeError } from "@/types/Equipe";
import { crudService } from "./crud-service";


export const equipeService = crudService<Equipe,EquipeError>("equipes");