import { Injectable } from '@nestjs/common';
import { AdminEntity } from './admin.entity';

@Injectable()
export class AdminArmazenado {
  private admins: AdminEntity[] = [];

  adicionarAdmin(admin: AdminEntity) {
    this.admins.push(admin);
  }
  
  pesquisaEmail(email:string){
    const possivelAdmin = this.Admins.find(
      (admin) => admin.email == email,
    );
    return possivelAdmin;
  }
  
  loginAdmin(email:string,senha:string){
    const possivelAdmin = this.pesquisaEmail(email);
    if (possivelAdmin){
      return{
        admin: possivelAdmin.senha == senha ? possivelAdmin : null,
        status: possivelAdmin.senha == senha,
      };
    }else{
      return{
        usuario:null,
        status:false,
      }
    }
  }
  get Admins() {
    return this.admins;
  }
}
