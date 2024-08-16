import { pessoaEntity } from '../pessoa.entity';

export class retornaPessoaDto {
  constructor(
    readonly status: string,
    readonly pessoa: pessoaEntity,
  ) {}
}
