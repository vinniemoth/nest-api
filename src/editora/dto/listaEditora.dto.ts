
export class ListaEditoraDTO{
    constructor(
        readonly id: string,
        readonly nome: string,
        readonly logo: string,
        readonly quadrinho: string, //momentaneo até a criação do banco de dados
    ){}
}
