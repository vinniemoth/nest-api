import { Module } from '@nestjs/common';
import { QuadrinhoController } from './quadrinho.controller';
import { quadrinhoArmazenado } from './quadrinho.dm';

@Module({
  controllers: [QuadrinhoController],
  providers: [quadrinhoArmazenado],
})
export class QuadrinhoModule {}
