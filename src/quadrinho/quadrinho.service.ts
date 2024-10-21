import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QUADRINHO } from './quadrinho.entity';
import { Like, Repository } from 'typeorm';
import { AlteraQuadrinhoDTO } from './dto/alteraQuadrinho.dto';
import { NotFoundException } from '@nestjs/common';
import { retornaQuadrinhoDto } from './dto/retornaQuadrinho.dto';
import { CriaQuadrinhoDTO } from './dto/criaQuadrinho.dto';
import { v4 as uuid } from 'uuid';
import { AutorService } from 'src/autor/autor.service';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class QuadrinhoService {
  constructor(
    @Inject('QUADRINHO_REPOSITORY')
    private quadrinhoRepository: Repository<QUADRINHO>,
    private readonly autorService: AutorService,
    private readonly adminService: AdminService,
  ) {}

  async search(term: string): Promise<QUADRINHO[]> {
    return this.quadrinhoRepository.find({
      where: { COLECAO: Like(`%${term}%`) },
    });
  }

  async listar(): Promise<QUADRINHO[]> {
    return this.quadrinhoRepository.find();
  }

  async adicionarQuadrinho(
    dados: CriaQuadrinhoDTO,
  ): Promise<retornaQuadrinhoDto> {
    let quadrinho = new QUADRINHO();
    quadrinho.ID = uuid();
    quadrinho.COLECAO = dados.COLECAO;
    quadrinho.EDICAO = dados.EDICAO;
    quadrinho.IMAGEM_CAPA = dados.IMAGEM_CAPA;
    quadrinho.LANCAMENTO = dados.LANCAMENTO;
    quadrinho.autor = await this.autorService.localizarNome(dados.AUTOR);
    quadrinho.uploaded_by = await this.adminService.localizarNome(
      dados.UPLOADED_BY,
    );

    return this.quadrinhoRepository
      .save(quadrinho)
      .then((result) => {
        return <retornaQuadrinhoDto>{
          status: 'Quadrinho criado',
          quadrinho: quadrinho,
        };
      })
      .catch((error) => {
        return <retornaQuadrinhoDto>{
          status: 'Erro ao criar o quadrinho',
          quadrinho: error,
        };
      });
  }

  async pesquisaId(id: string): Promise<QUADRINHO> {
    const quadrinhoEncontrado = await this.quadrinhoRepository.findOne({
      where: { ID: id },
    });
    if (!quadrinhoEncontrado) {
      throw new NotFoundException(`Quadrinho com ID ${id} não encontrado`);
    }
    return quadrinhoEncontrado;
  }

  async buscarQuadrinho(nome: string): Promise<QUADRINHO[]> {
    try {
      const quadrinhos = await this.quadrinhoRepository.find({
        where: { COLECAO: Like(`%${nome}%`) },
      });
      if (!quadrinhos.length) {
        console.error(`Nenhum quadrinho encontrado com o nome: ${nome}`);
      }
      return quadrinhos;
    } catch (error) {
      console.error('Erro ao buscar quadrinhos', error);
      throw new Error('Erro ao buscar quadrinhos');
    }
  }

  async alterar(
    id: string,
    dados: AlteraQuadrinhoDTO,
  ): Promise<retornaQuadrinhoDto> {
    const quadrinho = await this.pesquisaId(id);
    Object.entries(dados).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }
      quadrinho[chave] = valor;
    });

    return this.quadrinhoRepository
      .save(quadrinho)
      .then((result) => {
        return <retornaQuadrinhoDto>{
          status: 'Quadrinho Alterado',
          quadrinho: quadrinho,
        };
      })
      .catch((error) => {
        return <retornaQuadrinhoDto>{
          status: 'Erro ao alterar o Quadrinho',
          quadrinho: error,
        };
      });
  }

  async localizarColecao(COLECAO: string): Promise<QUADRINHO> {
    return this.quadrinhoRepository.findOne({ where: { COLECAO } });
  }
}
