import { Injectable } from '@nestjs/common';
import { QuadrinhoEntity } from './quadrinho.entity';
import { AlteraQuadrinhoDTO } from './dto/alteraQuadrinho.dto';

@Injectable()
export class quadrinhoArmazenado {
  private quadrinhos: QuadrinhoEntity[] = [];

  adicionarQuadrinho(quadrinho: QuadrinhoEntity) {
    this.quadrinhos.push(quadrinho);
  }

  pesquisaId(id: string) {
    const possivelQuadrinho = this.quadrinhos.find(
      (quadrinhoSalvo) => quadrinhoSalvo.id === id,
    );
    if (!possivelQuadrinho) {
      throw new Error('Id de quadrinho não encontrado.');
    }
    return possivelQuadrinho;
  }

  alteraQuadrinho(id: string, dadosNovos: AlteraQuadrinhoDTO) {
    const quadrinho = this.pesquisaId(id);

    Object.entries(dadosNovos).forEach(([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      quadrinho[chave] = valor;
    });

    return quadrinho;
  }

  removeQuadrinho(id: string) {
    const quadrinho = this.pesquisaId(id);

    this.quadrinhos = this.quadrinhos.filter(
      (quadrinhoSalvo) => quadrinhoSalvo.id !== id,
    );
    return quadrinho;
  }

  get Quadrinhos() {
    return this.quadrinhos;
  }
}
