import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';

@Module({
  controllers: [AdminController],
  // providers: [AdminArmazenado]
})
export class AdminModule {}
