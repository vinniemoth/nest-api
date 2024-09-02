import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CriaQuadrinhoDTO {
  @IsNumber()
  @IsNotEmpty({ message: 'Edição deve ser inserida' })
  @ApiProperty({
    example: 1,
    description: 'Edição do quadrinho',
  })
  edicao: number;

  @IsString()
  @IsNotEmpty({ message: 'Coleção deve ser inserida' })
  @ApiProperty({
    example: 'The Avengers',
    description: 'Nome da coleção do quadrinho',
  })
  colecao: string;

  @IsString()
  @IsNotEmpty({ message: 'Data de Lançamento deve ser inserida' })
  @ApiProperty({
    example: '01/01/2024',
    description: 'Data de lançamento do quadrinho',
  })
  lancamento: string;

  @IsString()
  @IsNotEmpty({ message: 'Link de imagem da capa deve ser inserida' })
  @ApiProperty({
    example: 'http://www.bancodeimagens.com/the-avengers/01/capa.png',
    description: 'URL da imagem de capa do quadrinho',
  })
  imagemCapa: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do enviante deve ser inserida' })
  @ApiProperty({
    example: 'Carlos Eduardo',
    description: 'Nome do usuário que enviou as informações do quadrinho',
  })
  uploadedBy: string;

  @IsString()
  @IsNotEmpty({ message: 'Editora deve ser inserida' })
  @ApiProperty({
    example: 'Marvel',
    description: 'Editora que publicou o quadrinho',
  })
  editora: string;
}
