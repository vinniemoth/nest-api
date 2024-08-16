import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { pessoaArmazenada } from './pessoa.dm';
import { v4 as uuid } from 'uuid';
import { pessoaEntity } from './pessoa.entity';
import { criaPessoaDto } from './dto/criaPessoa.dto';
import { retornaPessoaDto } from './dto/retornaPessoa.dto';
import { listaPessoaDto } from './dto/listaPessoa.dto';
import { alteraPessoaDto } from './dto/alteraPessoa.dto';

@Controller('/pessoas')
export class PessoaController {
  constructor(private Pessoas: pessoaArmazenada) {}

  // Criação de usuário
  @Post()
  async criaPessoa(@Body() dadosPessoa: criaPessoaDto) {
    var novaPessoa = new pessoaEntity(
      uuid(),
      dadosPessoa.nome,
      dadosPessoa.nascimento,
      dadosPessoa.pais,
    );
    this.Pessoas.adicionarPessoa(novaPessoa);
    var retorno = new retornaPessoaDto('Usuario criado', novaPessoa);
    return retorno;
  }
  // Get sem parâmetro de filtragem
  @Get()
  async retornaPessoa() {
    let pessoasListadas = this.Pessoas.Pessoas;
    const listaRetorno = pessoasListadas.map(
      (pessoa) =>
        new listaPessoaDto(
          pessoa.id,
          pessoa.nome,
          pessoa.nascimento,
          pessoa.pais,
        ),
    );

    return {
      Pessoas: listaRetorno,
    };
  }

  @Put('/:id')
  async alteraPessoa(
    @Body() dadosNovos: alteraPessoaDto,
    @Param('id') id: string,
  ) {
    let retornoAlteracao = this.Pessoas.alteraPessoa(id, dadosNovos);

    let retorno = new retornaPessoaDto('Pessoa alterada', retornoAlteracao);
    return retorno;
  }
}
