import { Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { EDITORA } from '../editora/editora.entity';
import { ADMIN } from 'src/admin/admin.entity';
import { AUTOR } from 'src/autor/autor.entity';

export class QUADRINHO {
  @PrimaryColumn()
  ID: string;

  @Column()
  EDICAO: number;

  @Column()
  COLECAO: string;

  @Column()
  LANCAMENTO: string;

  @Column()
  IMAGEMCAPA: string;

  @ManyToOne(() => EDITORA, (editora) => editora.quadrinho)
  @JoinColumn({ name: 'ID_QUADRINHO', referencedColumnName: 'ID' })
  editora: EDITORA;

  @ManyToOne(() => ADMIN, (uploaded_by) => uploaded_by.ID_QUADRINHO)
  @JoinColumn({ name: 'ID_UPLOADED_BY', referencedColumnName: 'ID' })
  uploaded_by: ADMIN;

  @ManyToOne(() => AUTOR, (autor) => autor.QUADRINHO)
  @JoinColumn({ name: 'ID_AUTOR', referencedColumnName: 'ID' })
  autor: AUTOR;
}
