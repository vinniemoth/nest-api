import { Body, Controller, Post } from "@nestjs/common";
import { criaUsuarioDTO } from "./dto/usuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import {v4  as uuid} from 'uuid'

@Controller('/usuarios')
export class UsuarioController{

    @Post()
    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO){
        var novoUsuario = new UsuarioEntity(uuid(), dadosUsuario.nome, dadosUsuario.idade, 
                                            dadosUsuario.cidade, dadosUsuario.email,
                                            dadosUsuario.telefone, dadosUsuario.senha
        )

        var usuario = {
            status:'Usuario criado',
            Usuario: novoUsuario
        }
        
        return usuario

    }
}