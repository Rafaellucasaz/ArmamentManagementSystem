export interface FetchResponse<T,E> {
    status:number;
    data?: T;
    errors?: E;
    headers: Headers;
  }

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function fetcher<T,E>(endpoint: string, options: RequestInit = {}): Promise<FetchResponse<T,E>> {

  const token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && client && uid ? { "access-token": token, client, uid } : {}),
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  
  const status = res.status;
  
  if(status == 200 || status == 201 || status == 204){
    if(status == 204){
      return { status, headers: res.headers };
    }
    const data = await res.json();
    return {status,data: data,headers:res.headers}
  }

  const errors = await res.json();

  return {status, errors:errors, headers:res.headers}

  

  
}

export default fetcher;