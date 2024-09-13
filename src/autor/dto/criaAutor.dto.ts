import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CriaAutorDTO{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'Jorisvaldo o Cartunista',
                  description: "O nome do autor do quadrinho a ser inserido"})
    nome: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Imagem",
                  description: "O beleza do autor do quadrinho a ser inserida"})
    foto: string;

    //classe quadrinho momentânea só para parar de dar erro
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "aaaa",
                  description: "aaaa"})
    quadrinho: string;
    /* "Quadrinhos" continuação quando chegar no banco de dados, não usar array por enquanto */
}