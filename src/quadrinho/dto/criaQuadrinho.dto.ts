import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CriaQuadrinhoDTO {
  @IsNumber()
  @IsNotEmpty({ message: 'Edição deve ser inserida' })
  edicao: number;

  @IsString()
  @IsNotEmpty({ message: 'Coleção deve ser inserida' })
  colecao: string;

  @IsString()
  @IsNotEmpty({ message: 'Data de Lançamento deve ser inserida' })
  lancamento: string;

  @IsString()
  @IsNotEmpty({ message: 'Link de imagem da capa deve ser inserida' })
  imagemCapa: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do enviante deve ser inserida' })
  uploadedBy: string;

  @IsString()
  @IsNotEmpty({ message: 'Editora deve ser inserida' })
  editora: string;
}
