import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class criaPessoaDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  nascimento: number;

  @IsNotEmpty()
  @IsString()
  pais: string;
}
