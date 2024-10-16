import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuadrinhoEntity } from './quadrinho.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class QuadrinhoService {
  constructor(
    //Código referente a aba de pesquisa
    @InjectRepository(QuadrinhoEntity)
    private quadrinhoRepository: Repository<QuadrinhoEntity>,
  ) {}
  async search(term: string): Promise<QuadrinhoEntity[]> {
    return this.quadrinhoRepository.find({
      where: { colecao: Like('%${term}%}') },
    });
  }
}

//-------------------------
