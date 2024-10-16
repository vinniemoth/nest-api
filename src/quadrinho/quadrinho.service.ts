import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuadrinhoEntity } from './quadrinho.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuadrinhoService {
  constructor(
    @InjectRepository(QuadrinhoEntity)
    private quadrinhoRepository: Repository<QuadrinhoEntity>,
  ) {}
  async search(term: string): Promise<QuadrinhoEntity[]> {
    return this.quadrinhoRepository.find({ where: { NOME: term } });
  }
}
