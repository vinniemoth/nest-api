import { Controller, Post, Body, Get, Param, Put, Query } from '@nestjs/common';
import { CriaQuadrinhoDTO } from './dto/criaQuadrinho.dto';
import { AlteraQuadrinhoDTO } from './dto/alteraQuadrinho.dto';
import { retornaQuadrinhoDto } from './dto/retornaQuadrinho.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuadrinhoService } from './quadrinho.service';
import { QUADRINHO } from './quadrinho.entity';

@ApiTags('Quadrinhos')
@Controller('quadrinhos')
export class QuadrinhoController {
  constructor(private readonly quadrinhoService: QuadrinhoService) {}

  @ApiResponse({
    status: 201,
    description: 'Quadrinho criado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Não foi possível criar o quadrinho. Verifique os dados.',
  })
  @Post()
  async adicionarQuadrinho(
    @Body() dadosQuadrinho: CriaQuadrinhoDTO,
  ): Promise<retornaQuadrinhoDto> {
    return this.quadrinhoService.adicionarQuadrinho(dadosQuadrinho);
  }

  @ApiResponse({
    status: 200,
    description: 'Quadrinhos listados com sucesso',
  })
  @ApiResponse({
    status: 200,
    description: 'Erro ao listar os quadrinhos',
  })
  @Get()
  async listar(): Promise<QUADRINHO[]> {
    return this.quadrinhoService.listar();
  }

  @ApiResponse({
    status: 200,
    description: 'Quadrinho encontrado com sucesso',
  })
  @ApiResponse({
    status: 200,
    description: 'Quadrinho não encontrado com o ID fornecido',
  })
  @Get('ID-:id')
  async listarID(@Param('id') id: string): Promise<QUADRINHO> {
    return this.quadrinhoService.pesquisaId(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Quadrinho atualizado com sucesso',
  })
  @ApiResponse({
    status: 200,
    description: 'Não foi possível atualizar o quadrinho. Verifique os dados.',
  })
  @Put('ID-:id')
  async alteraQuadrinho(
    @Body() dadosNovos: AlteraQuadrinhoDTO,
    @Param('id') id: string,
  ): Promise<retornaQuadrinhoDto> {
    return this.quadrinhoService.alterar(id, dadosNovos);
  }
}
