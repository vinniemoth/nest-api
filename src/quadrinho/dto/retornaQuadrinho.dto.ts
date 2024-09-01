import { QuadrinhoEntity } from '../quadrinho.entity';

export class retornaQuadrinhoDto {
  constructor(
    readonly status: string,
    readonly quadrinho: QuadrinhoEntity,
  ) {}
}
