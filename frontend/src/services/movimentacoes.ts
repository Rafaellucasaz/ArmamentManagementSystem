import { Movimentacao, MovimentacaoError } from "@/types/Movimentacao";
import { crudService } from "./crud-service";

export const movimentacaoService = crudService<Movimentacao,MovimentacaoError>("movimentacaos");

export const movimentacaoServiceEmprestimo = crudService<Movimentacao,MovimentacaoError>("/movimentacaos/create_emprestimo")

export const movimentacaoServiceDevolucao = crudService<Movimentacao,MovimentacaoError>("/movimentacaos/create_devolucao")


