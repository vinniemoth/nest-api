//classe de modulo do aplicativo, responsável por administrar todos os modulos da aplicação

import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { QuadrinhoModule } from './quadrinho/quadrinho.module';
import { EditoraModule } from './editora/editora.module';
import { AutorModule } from './autor/autor.module';


@Module({
  imports: [AdminModule, QuadrinhoModule, EditoraModule, AutorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
