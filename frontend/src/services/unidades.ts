import { Unidade, UnidadeError } from "@/types/Unidade";
import { crudService } from "./crud-service";

export const unidadeService = crudService<Unidade,UnidadeError>("unidades");
