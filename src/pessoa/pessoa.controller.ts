import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { pessoaArmazenada } from './pessoa.dm';
import { v4 as uuid } from 'uuid';
import { pessoaEntity } from './pessoa.entity';
import { criaPessoaDto } from './dto/criaPessoa.dto';
import { retornaPessoaDto } from './dto/retornaPessoa.dto';
import { listaPessoaDto } from './dto/listaPessoa.dto';
import { alteraPessoaDto } from './dto/alteraPessoa.dto';
import { RetornoUsuarioDTO } from 'src/usuario/dto/retornoUsuario.dto';

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

  @Get('/ano/:ano')
  async pesquisaAno(@Param('ano') ano: number) {
    let pessoasListadas = this.Pessoas.pesquisaAno(ano);
    const listaPessoa = pessoasListadas.map(
      (pessoa) =>
        new listaPessoaDto(
          pessoa.id,
          pessoa.nome,
          pessoa.nascimento,
          pessoa.pais,
        ),
    );
    return {
      Usuario: listaPessoa,
    };
  }

  @Get('/:id')
  async pesquisaId(@Param('id') id: string) {
    let pessoaListada = this.Pessoas.pesquisaId(id);
    const listaRetorno = new listaPessoaDto(
      pessoaListada.id,
      pessoaListada.nome,
      pessoaListada.nascimento,
      pessoaListada.pais,
    );
    return {
      Usuario: listaRetorno,
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

  @Delete('/:id')
  async removePessoa(@Param('id') id: string) {
    let retornoDeleta = await this.Pessoas.removePessoa(id);
    let retorno = new retornaPessoaDto('Exclusão efetuada', retornoDeleta);
    return retorno;
  }
}
