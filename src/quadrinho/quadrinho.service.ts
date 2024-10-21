import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { QUADRINHO } from './quadrinho.entity';
import { Like, Repository } from 'typeorm';
import { AlteraQuadrinhoDTO } from './dto/alteraQuadrinho.dto';
import { NotFoundException } from '@nestjs/common';
import { retornaQuadrinhoDto } from './dto/retornaQuadrinho.dto';
import { CriaQuadrinhoDTO } from './dto/criaQuadrinho.dto';
import { AutorService } from 'src/autor/autor.service';
import { AdminService } from 'src/admin/admin.service';
import { ColecaoService } from 'src/colecao/colecao.service';

@Injectable()
export class QuadrinhoService {
  constructor(
    //Código referente a aba de pesquisa
    @Inject('QUADRINHO_REPOSITORY')
    private quadrinhoRepository: Repository<QUADRINHO>,
    private readonly colecaoService: ColecaoService,
    private readonly autorService: AutorService,
    private readonly adminService: AdminService,
  ) {}
  async search(term: string): Promise<QUADRINHO[]> {
    return this.quadrinhoRepository.find({
      where: { colecao: Like(`%${term}%}`) },
    });
  }
  async listar(): Promise<QUADRINHO[]> {
    return this.quadrinhoRepository.find();
  }
  private quadrinhos: QUADRINHO[] = [];

  // Adiciona um novo quadrinho à lista
  // -- POST --
  async adicionarQuadrinho(
    dados: CriaQuadrinhoDTO,
  ): Promise<retornaQuadrinhoDto> {
    let quadrinho = new QUADRINHO();
    quadrinho.ID = uuid();
    quadrinho.colecao = await this.colecaoService.localizarNome(dados.COLECAO);
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

  // Retorna todos os quadrinhos armazenados
  get Quadrinhos(): QUADRINHO[] {
    return this.quadrinhos;
  }

  // Pesquisa um quadrinho pelo ID
  // -- GET --
  pesquisaId(id: string): QUADRINHO {
    const quadrinhoEncontrado = this.quadrinhos.find((quad) => quad.ID === id);
    if (!quadrinhoEncontrado) {
      throw new NotFoundException(`Quadrinho com ID ${id} não encontrado`);
    }
    return quadrinhoEncontrado;
  }

  buscarQuadrinho(nome: string): QUADRINHO[] {
    const quadrinhosEncontrados = this.quadrinhos.filter(
      (quad) => quad.colecao.NOME === nome,
    );
    if (quadrinhosEncontrados.length === 0) {
      throw new NotFoundException(`Quadrinho com nome ${nome} não encontrado`);
    }
    return quadrinhosEncontrados;
  }

  // -- UPDATE/PUT --
  // Altera os dados de um quadrinho já existente
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

  localizarColecao(COLECAO: string): Promise<QUADRINHO> {
    return this.quadrinhoRepository.findOne({
      where: {
        colecao: {
          NOME: COLECAO,
        },
      },
      relations: ['colecao'],
    });
  }
}
