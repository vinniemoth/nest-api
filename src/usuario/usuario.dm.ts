import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { AlteraUsuarioDTO } from "./dto/alteraUsuario.dto";

@Injectable()
export class UsuariosArmazenados{
    #usuarios:UsuarioEntity[]=[];

    AdcionarUsuario (usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }
    async removeUsuario(id: string) {
        const usuario = this.PesquisaId(id);   
        this.#usuarios = this.#usuarios.filter((usuarioSalvo) => usuarioSalvo.id !== id,);
        return usuario;
      }
      alteraUsuario(id: string, dadosNovos: AlteraUsuarioDTO) {
        const usuario = this.PesquisaId(id);
    
        Object.entries(dadosNovos).forEach(([chave, valor]) => {
          if (chave === 'id') {
            return;
          }else if(chave === 'senha'){
            usuario.trocaSenha(valor)
          }else{
            usuario[chave] = valor;
          }  
        });
        return usuario;
      }
    PesquisaEmail(email: string) {
        const possivelUsuario = this.#usuarios.find((usuario) => usuario.email == email,);
        return possivelUsuario;
      }
    PesquisaId(id:string){
        const possivelUsuario = this.#usuarios.find((usuarioSalvo) =>usuarioSalvo.id ===id);
        if (!possivelUsuario){
            throw new Error('Usuario não encontrado');
        }
        return possivelUsuario;
    }
    validaEmail(emailNovo: string) {
        const possivelUsuario = this.PesquisaEmail(emailNovo);
    
        return possivelUsuario === undefined;
      }
    Login(email: string, senha: string) {
    const possivelUsuario = this.PesquisaEmail(email);
        return {
        usuario: possivelUsuario.login(senha) ? possivelUsuario:null,status:possivelUsuario.login(senha)
        }
      }

      get Usuarios() {
        return this.#usuarios;
      }
}
    
