export class AutorEntity{
    id: string;
    nome: string;
    foto: string;
    quadrinho: string; //momentaneo até a criação do banco de dados

    constructor(id:string, nome:string, foto:string,quadrinho: string) {
        this.id = id;
        this.nome = nome;
        this.foto = foto;
        this.quadrinho = quadrinho;
    }
}