export class listaPessoaDto {
  constructor(
    readonly id: string,
    readonly nome: string,
    readonly nascimento: number,
    readonly pais: string,
  ) {}
}
