import { QUADRINHO } from 'src/quadrinho/quadrinho.entity';
import { Column, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';

export class AUTOR {
  @PrimaryColumn()
  ID: string;

  @Column({ length: 255 })
  NOME: string;

  @Column({ length: 255 })
  FOTO: string;

  @OneToMany(() => QUADRINHO, (quadrinho) => quadrinho.AUTOR)
  @JoinColumn({ name: 'ID_QUADRINHO', referencedColumnName: 'ID' })
  QUADRINHO: string;
}
