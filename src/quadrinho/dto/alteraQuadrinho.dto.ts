import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class AlteraQuadrinhoDTO {
  @IsNumber()
  @IsOptional()
  edicao: number;

  @IsString()
  @IsOptional()
  colecao: string;

  @IsString()
  @IsOptional()
  lancamento: string;

  @IsString()
  @IsOptional()
  imagemCapa: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do alterante deve ser inserida' })
  uploadedBy: string;

  @IsString()
  @IsOptional()
  editora: string;
}
