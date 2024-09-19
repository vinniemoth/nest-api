import { IsEmail, MinLength } from "class-validator";

export class loginAdminDTO{

    @IsEmail(undefined,{message:"Email inválido"})
    email:string;

    @MinLength(8,{message:"Senha deve ter no minimo 8 caracteres."})
    senha:string;
    
}