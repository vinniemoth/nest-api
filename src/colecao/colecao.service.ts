import { v4 as uuid } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CriaColecaoDto } from './dto/criaColecao.dto';
import { AlteraColecaoDTO } from './dto/alteraColecao.dto';
import { RetornaColecaoDto } from './dto/retornaColecao.dto';
import { COLECAO } from './colecao.entity';

@Injectable()
export class ColecaoService {
  constructor(
    @Inject('COLECAO_REPOSITORY')
    private readonly colecaoRepository: Repository<COLECAO>,
  ) {}

  async listar(): Promise<COLECAO[]> {
    return this.colecaoRepository.find();
  }

  async inserir(dados: CriaColecaoDto): Promise<RetornaColecaoDto> {
    let colecao = new COLECAO();
    colecao.ID = uuid();
    colecao.NOME = dados.NOME;
    colecao.LANCAMENTO = dados.LANCAMENTO;
    colecao.FOTO = dados.FOTO;
    colecao.SINOPSE = dados.SINOPSE;

    return this.colecaoRepository
      .save(colecao)
      .then((result) => {
        return <RetornaColecaoDto>{
          status: 'Coleção criada',
          colecao: colecao,
        };
      })
      .catch((error) => {
        return <RetornaColecaoDto>{
          status: 'Erro ao criar a coleção',
          colecao: error,
        };
      });
  }

  async alterar(
    id: string,
    dados: AlteraColecaoDTO,
  ): Promise<RetornaColecaoDto> {
    const colecao = await this.localizarID(id);

    Object.entries(dados).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      colecao[chave] = valor;
    });

    return this.colecaoRepository
      .save(colecao)
      .then((result) => {
        return <RetornaColecaoDto>{
          status: 'Coleção alterada',
          colecao: colecao,
        };
      })
      .catch((error) => {
        return <RetornaColecaoDto>{
          status: 'Erro ao alterar a coleção',
          colecao: error,
        };
      });
  }
  localizarID(ID: string): Promise<COLECAO> {
    return this.colecaoRepository.findOne({
      where: {
        ID,
      },
    });
  }

  localizarNome(NOME: string): Promise<COLECAO> {
    return this.colecaoRepository.findOne({
      where: {
        NOME,
      },
    });
  }
}
