import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuariosArmazenados } from './usuario.dm';
import { emailUnicoValidator } from './validacao/email-unico.validator';

@Module({  
  controllers: [UsuarioController],  
  providers: [UsuariosArmazenados,emailUnicoValidator],
})
export class UsuarioModule {}
