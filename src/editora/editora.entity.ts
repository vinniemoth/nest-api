export class EditoraEntity{
    id: string;
    nome: string;
    logo: string;
    quadrinho: string; //momentaneo até a criação do banco de dados

    constructor(id:string, nome:string, logo:string,quadrinho: string) {
        this.id = id;
        this.nome = nome;
        this.logo = logo;
        this.quadrinho = quadrinho;
    }
}