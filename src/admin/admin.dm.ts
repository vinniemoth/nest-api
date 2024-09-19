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

  pesquisaEmail(email:string){
    const possivelAdmin = this.Admins.find(
      (admin) => admin.email == email,
      );
      return possivelAdmin;
  }

  // login(email:string,senha:string){
  //   const possivelAdmin = this.pesquisaEmail(email);
  //   return {admin:possivelAdmin.login(senha)}
  // }
}
