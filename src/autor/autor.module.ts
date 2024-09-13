import { Module } from '@nestjs/common';
import { AutorController} from './autor.controller';
import { AutorArmazenada} from './autor.dm';


@Module({
  controllers: [AutorController],
  providers: [AutorArmazenada],
})
export class AutorModule {}
