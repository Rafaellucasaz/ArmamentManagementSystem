import fetcher, { FetchResponse } from "./api";

export function crudService<T,E>(endpoint: string) {
    return {
        fetchAll: async (): Promise<FetchResponse<T[],E>>=> {
            return (await fetcher<T[],E>(`/${endpoint}`));
        },


        create: async (data: T): Promise<FetchResponse<T,E>> => {
            return (await fetcher<T,E>(`/${endpoint}`, {
                method: "POST",
                body: JSON.stringify(data),
            }));
        },

        update: async (id: number, data: T): Promise<FetchResponse<T,E>> => {
            return (await fetcher<T,E>(`/${endpoint}/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
            }));
        },

        delete: async (id: number): Promise<FetchResponse<T,E>> => {
            return (await fetcher<T,E>(`/${endpoint}/${id}`, { method: "DELETE" }));
        },
    };
}