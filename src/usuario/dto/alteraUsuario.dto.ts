import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
export class AlteraUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @EmailUnico({message: "Email repetido"})
    @IsEmail(undefined, {message: "email inválido"})
    @IsOptional()
    email: string;

    @MinLength(6, {message: "senha deve ter no minimo 8 digitos"})
    @IsOptional()
    senha:string;
}