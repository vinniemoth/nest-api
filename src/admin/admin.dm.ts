import { Injectable } from '@nestjs/common';
import { AdminEntity } from './admin.entity';
import { AlteraAdminDTO } from './dto/alteraAdmin.dto';

@Injectable()
export class AdminArmazenado {

  private admins: AdminEntity[] = [];
  
  adicionarAdmin(admin: AdminEntity) {
    this.admins.push(admin);
  }
  
  pesquisaEmail(email:string){
    const possivelAdmin = this.admins.find(
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
  alteraAdmin(email:string,dadosNovos: AlteraAdminDTO){
    const AltAdimin = this.pesquisaEmail(email)
    Object.entries(dadosNovos).forEach(([chave, valor]) => {
      if (chave === 'email'){
        return
      }else if(valor === 'senha'){
        AltAdimin.trocaSenha(valor)
      }else{
        AltAdimin[chave] = valor;
      }
    }) 
  }
  get Admins(){
    return this.admins;
  }
}