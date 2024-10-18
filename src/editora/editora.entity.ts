import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { QUADRINHO } from 'src/quadrinho/quadrinho.entity';

@Entity()
export class EDITORA {
  @PrimaryColumn()
  ID: string;

  @Column({ length: 255 })
  NOME: string;

  @Column({ length: 255 })
  LOGO: string;

  @OneToMany(() => QUADRINHO, (quadrinho) => quadrinho.autor)
  @JoinColumn({ name: 'ID_QUADRINHO', referencedColumnName: 'ID' })
  quadrinho: QUADRINHO;
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
