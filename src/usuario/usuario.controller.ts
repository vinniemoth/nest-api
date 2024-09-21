import { Controller } from "@nestjs/common/decorators";
import { ApiTags } from "@nestjs/swagger";
import { quadrinhoArmazenado } from "src/quadrinho/quadrinho.dm";

@ApiTags('Usuário')
@Controller('/usuario')
export class UsuarioController{
    constructor(private Quadrinhos: quadrinhoArmazenado){
        
    }
}