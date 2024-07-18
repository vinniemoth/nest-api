import { UsuarioEntity } from "./usuario.entity";

export class UsuariosArmazenados{
    #usuarios: UsuarioEntity[] = [];  

    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuarios.push(usuario);
    }

    validaEmail(email:string){
        const possivelUsuario = this.#usuarios.find(
            usuario => usuario.email === email
        );
        return (possivelUsuario !== undefined);
    }

    get Usuarios(){        
        return this.#usuarios;
    }
}