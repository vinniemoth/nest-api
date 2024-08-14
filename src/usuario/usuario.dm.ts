import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { alteraUsuarioDTO } from "./dto/alteraUsuario.dto";

@Injectable()
export class UsuariosArmazenados{
    #usuarios: UsuarioEntity[] = [];  

    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }

    pesquisaEmail(email:string){
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email == email
        )
        return possivelUsuario;
    }    

    pesquisaId(id:string){
        const possivelUsuario = this.#usuarios.find(
            usuarioSalvo => usuarioSalvo.id === id
        );

        if(!possivelUsuario){
            throw new Error('Usuario não encontrado');
        }

        return possivelUsuario
    }

    alteraUsuario(id:string,dadosNovos: alteraUsuarioDTO){
        const usuario = this.pesquisaId(id);

        Object.entries(dadosNovos).forEach(
            ([chave,valor]) => {
                if(chave === 'id'){
                    return
                }

                usuario[chave] = valor;
            }
        )

        return usuario;
        
    }

    validaEmail(emailNovo: string){
        const possivelUsuario = this.pesquisaEmail(emailNovo)
        
        return (possivelUsuario === undefined)
    }

    Login(email:string ,senha:string){
        const possivelUsuario = this.pesquisaEmail(email)

        if (possivelUsuario){
            return {
                usuario: possivelUsuario.senha == senha?possivelUsuario:null,
                status: possivelUsuario.senha == senha
            };
        }else{
            return {
                usuario: null,
                status: false
            };
        }
    }

 

    get Usuarios(){        
        return this.#usuarios;
    }
}