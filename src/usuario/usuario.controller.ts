import { Body, Controller, Post } from "@nestjs/common";
import { criaUsuarioDTO } from "./dto/usuario.dto";

@Controller('/usuarios')
export class UsuarioController{

    @Post()
    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO){
        
        var usuario = {
            status:'Usuario criado',
            Usuario: dadosUsuario
        }
        
        return usuario

    }
}