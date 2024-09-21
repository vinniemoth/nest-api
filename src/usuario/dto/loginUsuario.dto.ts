//DTO responsável por receber dados de login
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados

import { IsEmail, MinLength } from "class-validator";

export class loginUsuarioDTO{
    
    @IsEmail(undefined, {message: "email inválido"})
    email: string;

    @MinLength(8, {message: "senha deve ter no minimo 8 digitos"})
    senha:string;
    
}