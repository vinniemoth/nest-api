import { Module } from '@nestjs/common';
import { EditoraController } from './editora.controller';
import { EditoraArmazenada } from './editora.dm';


@Module({
  controllers: [EditoraController],
  providers: [EditoraArmazenada],
  providers: [...AutorProvider, AutorService],
})
export class EditoraModule {}
