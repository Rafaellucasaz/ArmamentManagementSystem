import { EditUser, userError } from "@/types/User";
import fetcher from "./api";

export async function getUser(){
    return await fetcher<EditUser,userError>("/user");
  
}


export async function editUser(user:EditUser){
    return await fetcher<EditUser,userError>("/auth/password", {
        method: "PUT",
        body: JSON.stringify(user),
    });
}