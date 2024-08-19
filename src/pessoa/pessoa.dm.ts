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

  pesquisaAno(ano: number) {
    const possivelPessoa = this.pessoas.filter(
      (pessoaSalva) => pessoaSalva.nascimento === ano,
    );

    if (!possivelPessoa) {
      throw new Error('Pessoa não encontrada.');
    }
    return possivelPessoa;
  }

  pesquisaId(id: string) {
    const possivelPessoa = this.pessoas.find(
      (pessoaSalva) => pessoaSalva.id === id,
    );

    if (!possivelPessoa) {
      throw new Error('Id de pessoa não encontrado.');
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

  removePessoa(id: string) {
    const pessoa = this.pesquisaId(id);

    this.pessoas = this.pessoas.filter((pessoaSalva) => pessoaSalva.id !== id);

    return pessoa;
  }
  get Pessoas() {
    return this.pessoas;
  }
}
