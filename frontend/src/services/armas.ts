import { Arma, ArmaError } from "@/types/Arma";
import { crudService } from "./crud-service";


export const armaService = crudService<Arma,ArmaError>("armas");