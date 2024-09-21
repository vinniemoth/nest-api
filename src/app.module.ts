import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { QuadrinhoModule } from './quadrinho/quadrinho.module';
import { EditoraModule } from './editora/editora.module';
import { AutorModule } from './autor/autor.module';
import { UsuarioModule } from './usuario/usuario.module';


@Module({
  imports: [AdminModule, QuadrinhoModule, EditoraModule, AutorModule,UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
