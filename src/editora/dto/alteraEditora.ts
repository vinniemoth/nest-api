import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class AlteraEditoraDTO{
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({example:'Marvel to DC',
                          description:'alteração do nome da Editora'})
    nome: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({example:1,
        description:'Aletração da imagem utilizada pela editora'
    })
    logo: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({example:1,
        description:'0000'
    })
    quadrinho: string; //temporario
}