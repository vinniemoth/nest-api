import * as bcrypt from 'bcrypt';

export class AdminEntity {
  id: string;
  nome: string;
  email: string;
  senha: string;
  // quadrinhosEnviados:Quadrinho[]
  constructor(id: string, nome: string, email: string, senha: string) {
    const saltOrRounds = 10;
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = bcrypt.hashSync(senha,saltOrRounds)
    // this.quadrinhosEnviados:Quadrinho[];
  }
  trocaSenha(senha){
    const saltOrRounds =10;
    this.senha = bcrypt.hashSync(senha, saltOrRounds)
}
login(senha){
    return bcrypt.compareSync(senha,this.senha)
}
}
