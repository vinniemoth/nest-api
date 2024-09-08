//classe de modulo do aplicativo, responsável por administrar todos os modulos da aplicação

import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { QuadrinhoModule } from './quadrinho/quadrinho.module';

@Module({
  imports: [AdminModule, QuadrinhoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
