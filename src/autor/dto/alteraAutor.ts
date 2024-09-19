import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AlteraAutorDTO{
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({example:'Jorisvaldo o Cartunista',
                          description:'alteração do nome da Autor'})
    nome: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({example:'http://www.bancodeimagens.com/the-avengers/01/capa.png',
        description:'Alteração da imagem utilizada pelo autor'
    })
    foto: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({example:1,
        description:'0000'
    })
    quadrinho: string; //temporario
}