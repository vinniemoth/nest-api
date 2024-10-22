import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { COLECAO } from './colecao.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColecaoService } from './colecao.service';
import { CriaColecaoDto } from './dto/criaColecao.dto';
import { RetornaColecaoDto } from './dto/retornaColecao.dto';
import { AlteraColecaoDTO } from './dto/alteraColecao.dto';

@ApiTags('Coleção')
@Controller('colecao')
export class ColecaoController {
  constructor(private readonly colecaoService: ColecaoService) {}

  //Criação
  @ApiResponse({
    status: 201,
    description: 'Retorna que a coleção foi criada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description:
      'Retorna que não foi possível a criação da coleção,favor checar as informações',
  })
  @Post()
  async criaColecao(@Body() dados: CriaColecaoDto): Promise<RetornaColecaoDto> {
    return this.colecaoService.inserir(dados);
  }

  //Pesquisa
  @ApiResponse({
    status: 200,
    description: 'Retorna o sucesso ao encontrar a coleção',
  })
  @ApiResponse({
    status: 500,
    description:
      'Retorna que não foi possível encontrar a coleção,favor checar as informações',
  })
  @Get()
  async listar(): Promise<COLECAO[]> {
    return this.colecaoService.listar();
  }

  //Pesquisa por ID
  @ApiResponse({
    status: 200,
    description:
      'Retorna que o id específico da coleção foi encontrado com sucesso',
  })
  @ApiResponse({
    status: 500,
    description:
      'Retorna que não foi possível encontrar a id da autor,favor checar as informações',
  })
  @Get('ID-:id')
  async listarID(@Param('id') id: string): Promise<COLECAO> {
    return this.colecaoService.localizarID(id);
  }
  //Alteração
  @ApiResponse({
    status: 200,
    description: 'Retorna que a Colecao foi alterada com sucesso',
  })
  @ApiResponse({
    status: 500,
    description:
      'Retorna que não foi possível a alteração da colecao,favor checar as informações',
  })
  @Put('/ID-:id')
  async alteraColecao(
    @Body() dadosNovos: AlteraColecaoDTO,
    @Param('id') id: string,
  ): Promise<RetornaColecaoDto> {
    return this.colecaoService.alterar(id, dadosNovos);
  }
}
