import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EditoraController } from './editora.controller';
import { editoraService } from './editora.service';
import { EditoraProvider } from './editora.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [EditoraController],
  providers: [...EditoraProvider, editoraService],
})
export class EditoraModule {}
