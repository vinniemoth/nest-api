export class QuadrinhoEntity {
  id: string;
  edicao: number;
  colecao: string;
  lancamento: string;
  imagemCapa: string;
  editora: string;
  uploadedBy: string;
  // tags:Tag[]
  constructor(
    id: string,
    edicao: number,
    colecao: string,
    lancamento: string,
    imagemCapa: string,
    editora: string,
    uploadedBy: string,
  ) {
    this.id = id;
    this.edicao = edicao;
    this.colecao = colecao;
    this.lancamento = lancamento;
    this.imagemCapa = imagemCapa;
    this.editora = editora;
    this.uploadedBy = uploadedBy;
    // this.tags = tags;
  }
}
