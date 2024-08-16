import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class alteraPessoaDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsNumber()
  @IsOptional()
  nascimento: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  pais: string;
}
