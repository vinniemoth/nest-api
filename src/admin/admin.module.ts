import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminArmazenado } from './admin.dm';

@Module({
  controllers: [AdminController],
  providers: [AdminArmazenado],
})
export class AdminModule {}
