import { Injectable } from '@nestjs/common';
import { pessoaEntity } from './pessoa.entity';
import { criaPessoaDto } from './dto/criaPessoa.dto';
import { alteraPessoaDto } from './dto/alteraPessoa.dto';

@Injectable()
export class pessoaArmazenada {
  private pessoas: pessoaEntity[] = [];

  adicionarPessoa(pessoa: pessoaEntity) {
    this.pessoas.push(pessoa);
  }

  pesquisaId(id: string) {
    const possivelPessoa = this.Pessoas.find(
      (pessoaSalva) => pessoaSalva.id === id,
    );

    if (!possivelPessoa) {
      throw new Error('Pessoa não encontrada.');
    }
    return possivelPessoa;
  }

  alteraPessoa(id: string, dadosNovos: alteraPessoaDto) {
    const pessoa = this.pesquisaId(id);

    Object.entries(dadosNovos).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      pessoa[chave] = valor;
    });

    return pessoa;
  }
  get Pessoas() {
    return this.pessoas;
  }
}
