import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CriaAdminDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  // @Exclude()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  senha: string;
}
