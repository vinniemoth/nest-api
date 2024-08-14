import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { criaUsuarioDTO } from "./dto/usuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import {v4  as uuid} from 'uuid'
import { UsuariosArmazenados } from "./usuario.dm";
import { RetornoUsuarioDTO } from "./dto/retornoUsuario.dto";
import { ListaUsuarioDTO } from "./dto/listaUsuario.dto";
import { loginUsuarioDTO } from "./dto/loginUsuario.dto";
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto";

@Controller('/usuarios')
export class UsuarioController{
    
    constructor(private Usuarios : UsuariosArmazenados){

    }

    @Post()//essa linha, seria um decorator para definir que a função é um metodo POST
    async criaUsuario(@Body() dadosUsuario: criaUsuarioDTO){        
        var novoUsuario = new UsuarioEntity(uuid(), dadosUsuario.nome, dadosUsuario.idade, 
                                            dadosUsuario.cidade, dadosUsuario.email,
                                            dadosUsuario.telefone, dadosUsuario.senha
        )
        this.Usuarios.AdicionarUsuario(novoUsuario);
        var retorno = new RetornoUsuarioDTO('Usuario criado',novoUsuario);        
        return retorno        
    }

    @Post('/login')
    async fazerLogin(@Body() dadosLogin: loginUsuarioDTO){
        var retornoLogin = this.Usuarios.Login(dadosLogin.email,dadosLogin.senha)

        var retorno = new RetornoUsuarioDTO(retornoLogin.status?'Login efetuado':'Email ou senha invalidos',retornoLogin.usuario);        
        return retorno;       
        
    }

    @Put('/:id')
    async alteraUsuario(@Body() dadosNovos: alteraUsuarioDTO,@Param('id') id: string){
        var retornoAlteracao = this.Usuarios.alteraUsuario(id,dadosNovos)

        var retorno = new RetornoUsuarioDTO('Alteração Efetuada',retornoAlteracao);        
        return retorno;       
        
    }

    @Get('/:ID')
    async retornaUsuarioId(@Param('ID') ID:string){

        var usuariosListados = this.Usuarios.pesquisaId(ID);
        const ListaRetorno = new ListaUsuarioDTO(usuariosListados.id,
                                                usuariosListados.nome,
                                                usuariosListados.email)

        return {
                Usuario: ListaRetorno
            };
    }

    @Get()
    async retornaUsuario(){

        var usuariosListados = this.Usuarios.Usuarios;
        const ListaRetorno = usuariosListados.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.nome,
                usuario.email
            )
        );



        return {
                Usuarios: ListaRetorno
            };
    }
}