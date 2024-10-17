import { Column, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

export class EDITORA {
  @PrimaryColumn()
  ID: string;

  @Column({ length: 255 })
  NOME: string;

  @Column({ length: 255 })
  LOGO: string;

  @OneToMany(() => QUADRINHO, (quadrinho) => quadrinho.AUTOR)
  @JoinColumn({ name: 'ID_QUADRINHO', referencedColumnName: 'ID' })
  QUADRINHO: string;
  static QUADRINHO: any;
  static LOGO: any;
  static NOME: any;
  static ID: any;
}


/* export class EditoraEntity{
    id: string;
    nome: string;
    logo: string;
    quadrinho: string; //momentaneo até a criação do banco de dados

    constructor(id:string, nome:string, logo:string,quadrinho: string) {
        this.id = id;
        this.nome = nome;
        this.logo = logo;
        this.quadrinho = quadrinho;
    }
}

 */
