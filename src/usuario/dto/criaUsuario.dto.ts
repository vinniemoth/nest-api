import { IsDate, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class criaUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    nome: string;

    @EmailUnico({message: "Email repetido"})
    @IsEmail(undefined, {message: "email inválido"})
    email: string;

    @MinLength(6, {message: "senha deve ter no minimo 8 digitos"})
    senha:string;
}