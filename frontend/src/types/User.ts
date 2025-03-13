export type EditUser = {
    name:string;
    email:string;
    password:string;
    password_confirmation:string;

}

export type userError = {
    error:string;
}

export type authResponse = {
    data:{
        allow_password_change:boolean;
        email:string;
        first_login:boolean;
        id:number;
        name:string;
        provider:string;
        uid:string;
    }
  
}



export type authError = {
    success:boolean;
    errors:string[];
}

export type changePassword = {
    password:string;
    password_confirmation:string;
}