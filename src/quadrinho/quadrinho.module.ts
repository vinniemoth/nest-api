import { Module } from '@nestjs/common';
import { QuadrinhoController } from './quadrinho.controller';
import { quadrinhoArmazenado } from './quadrinho.dm';
import { DatabaseModule } from 'src/database/database.module';
import { QuadrinhoProvider } from './quadrinho.provider';
import { QuadrinhoService } from './quadrinho.service';

@Module({
  imports: [DatabaseModule],
  controllers: [QuadrinhoController],
  providers: [...QuadrinhoProvider, QuadrinhoService],
})
export class QuadrinhoModule {}
