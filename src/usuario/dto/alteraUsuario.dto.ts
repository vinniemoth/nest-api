import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class alteraUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @EmailUnico({message: "Email repetido"})
    @IsEmail(undefined, {message: "email inválido"})
    @IsOptional()
    email: string;

    @MinLength(6, {message: "senha deve ter no minimo 6 digitos"})
    @IsOptional()
    senha:string;
    
    @IsNumber()
    @IsOptional()
    idade: number;

    @IsString()
    @IsOptional()
    cidade: string;

    @IsString()
    @IsOptional()
    telefone: string;
}