export class AdminEntity {
  id: string;
  nome: string;
  email: string;
  senha: string;
  // quadrinhosEnviados:Quadrinho[]
  constructor(id: string, nome: string, email: string, senha: string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    // this.quadrinhosEnviados:Quadrinho[];
  }
}
