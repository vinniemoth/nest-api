
export class ListaAutorDTO{
    constructor(
        readonly id: string,
        readonly nome: string,
        readonly foto: string,
        readonly quadrinho: string, //momentaneo até a criação do banco de dados
    ){}
}
