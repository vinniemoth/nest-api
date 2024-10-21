import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ColecaoProvider } from './colecao.provider';
import { ColecaoService } from './colecao.service';
import { ColecaoController } from './colecao.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ColecaoController],
  providers: [...ColecaoProvider, ColecaoService],
})
export class ColecaoModule {}
