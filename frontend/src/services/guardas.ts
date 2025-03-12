import { Guarda, GuardaError } from "@/types/Guarda";
import { crudService } from "./crud-service";


export const guardaService = crudService<Guarda,GuardaError>("guardas");