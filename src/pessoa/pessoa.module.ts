import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { pessoaArmazenada } from './pessoa.dm';

@Module({
  controllers: [PessoaController],
  providers: [pessoaArmazenada],
})
export class PessoaModule {}
