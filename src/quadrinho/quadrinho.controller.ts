import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { quadrinhoArmazenado } from './quadrinho.dm';
import { CriaQuadrinhoDTO } from './dto/criaQuadrinho.dto';
import { QuadrinhoEntity } from './quadrinho.entity';
import { v4 as uuid } from 'uuid';
import { retornaQuadrinhoDto } from './dto/retornaQuadrinho.dto';
import { listaQuadrinhoDTO } from './dto/listaQuadrinho.dto';
import { AlteraQuadrinhoDTO } from './dto/alteraQuadrinho.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Quadrinhos')
@Controller('/comics')
export class QuadrinhoController {
  constructor(private Quadrinhos: quadrinhoArmazenado) {}

  @ApiResponse({
    status: 201,
    description: 'Retorna que houve sucesso ao criar o quadrinho',
  })
  @ApiResponse({
    status: 400,
    description:
      'Retorna que não foi possível criar o quadrinho. Verifique os dados.',
  })
  @Post()
  async criaQuadrinho(@Body() dadosQuadrinho: CriaQuadrinhoDTO) {
    let novoQuadrinho = new QuadrinhoEntity(
      uuid(),
      dadosQuadrinho.edicao,
      dadosQuadrinho.colecao,
      dadosQuadrinho.lancamento,
      dadosQuadrinho.imagemCapa,
      dadosQuadrinho.editora,
      dadosQuadrinho.uploadedBy,
    );
    this.Quadrinhos.adicionarQuadrinho(novoQuadrinho);
    let retorno = new retornaQuadrinhoDto('Quadrinho criado', novoQuadrinho);
    return retorno;
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna que houve sucesso ao encontrar os quadrinhos',
  })
  @ApiResponse({
    status: 500,
    description: 'Retorna que não foi possível encontrar os quadrinhos',
  })
  @Get()
  async retornaQuadrinho() {
    let quadrinhosListados = this.Quadrinhos.Quadrinhos;
    const listaQuadrinhos = quadrinhosListados.map(
      (quadrinho) =>
        new listaQuadrinhoDTO(
          quadrinho.id,
          quadrinho.edicao,
          quadrinho.colecao,
          quadrinho.lancamento,
          quadrinho.imagemCapa,
          quadrinho.editora,
          quadrinho.uploadedBy,
        ),
    );
    return {
      Quadrinhos: listaQuadrinhos,
    };
  }

  @ApiResponse({
    status: 200,
    description:
      'Retorna que houve sucesso ao encontrar o quadrinho com determinada id',
  })
  @ApiResponse({
    status: 500,
    description:
      'Retorna que não foi possível encontrar o quadrinho com determinada id',
  })
  @Get('/:id')
  async pesquisaId(@Param('id') id: string) {
    let quadrinhosListados = this.Quadrinhos.pesquisaId(id);
    const ListaRetorno = new listaQuadrinhoDTO(
      quadrinhosListados.id,
      quadrinhosListados.edicao,
      quadrinhosListados.colecao,
      quadrinhosListados.lancamento,
      quadrinhosListados.imagemCapa,
      quadrinhosListados.editora,
      quadrinhosListados.uploadedBy,
    );
    return {
      Quadrinho: ListaRetorno,
    };
  }

  @ApiResponse({
    status: 200,
    description:
      'Retorna que houve sucesso ao atualizar o quadrinho com determinada id',
  })
  @ApiResponse({
    status: 500,
    description:
      'Retorna que não foi possível atualizar o quadrinho com determinada id',
  })
  @Put('/:id')
  async alteraQuadrinho(
    @Body() dadosNovos: AlteraQuadrinhoDTO,
    @Param('id') id: string,
  ) {
    let retornoAlteracao = await this.Quadrinhos.alteraQuadrinho(
      id,
      dadosNovos,
    );
    let retorno = new retornaQuadrinhoDto(
      'Quadrinho Alterado',
      retornoAlteracao,
    );
    return retorno;
  }
}
