import fetcher from "./api";


export async function login(email:string,password:string) {
    try {
        
        const response = await fetcher("/auth/sign_in", {
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
    } catch (error) {
        console.error("Erro no login:", error);
        return null;
    }
}