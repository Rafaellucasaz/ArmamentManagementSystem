import { authError, authResponse, changePassword } from "@/types/User";
import fetcher from "./api";


export async function login(email:string,password:string) {

  const response = await fetcher<authResponse,authError>("/auth/sign_in", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });


  const token = response.headers.get("access-token");
  const client = response.headers.get("client");
  const uid = response.headers.get("uid");

  if (token && client && uid) {
    
    localStorage.setItem("access-token", token);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
  }

  return response; 
    
}

export async function sendEmail(email:string){
  const response = await fetcher("/auth/password", {
    method: "POST",
    body: JSON.stringify({email:email, redirect_url:"http://localhost:3001/recuperarSenha/mudarSenha"})
  })
  return response;
}

export async function resetPassword(data:changePassword,accessToken:string,uid:string,client:string){
  const response = await fetcher("/auth/password",{
    headers: {
      "access-token":accessToken,
      "uid":uid,
      "client":client,
    },
    method: "PUT",
    body: JSON.stringify(data)
  })

  return response;
}