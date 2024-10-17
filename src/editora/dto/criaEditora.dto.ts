import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CriaEditoraDTO{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "Marvel",
                  description: "O nome da editora do quadrinho a ser inserido"})
    NOME: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "http://www.bancodeimagens.com/the-avengers/01/capa.png",
                  description: "O logotipo da editora do quadrinho a ser inserido"})
    LOGO: string;

    //classe quadrinho momentânea só para parar de dar erro
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "aaaa",
                  description: "aaaa"})
    QUADRINHO: string;
    /* "Quadrinhos" continuação quando chegar no banco de dados, não usar array por enquanto */
}