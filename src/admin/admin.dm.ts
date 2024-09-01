import { Injectable } from '@nestjs/common';
import { AdminEntity } from './admin.entity';

@Injectable()
export class AdminArmazenado {
  private admins: AdminEntity[] = [];

  adicionarAdmin(admin: AdminEntity) {
    this.admins.push(admin);
  }
  get Admins() {
    return this.admins;
  }
}
