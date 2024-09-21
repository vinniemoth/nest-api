import * as bcrypt from 'bcrypt';

export class UsuarioEntity{
    id:string;
    nome:string;
    email:string;
    senha:string;

    constructor(id:string,nome:string,email:string,senha:string){
        const saltOrRounds = 10;
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = bcrypt.hashSync(senha, saltOrRounds);
    }
    trocaSenha(senha){
        const saltOrRounds = 10
        this.senha = bcrypt.hashSync(senha,saltOrRounds)
    }
    login(senha){
        return bcrypt.compareSync(senha,this.senha)
    }
}