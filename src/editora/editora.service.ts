import { v4 as uuid } from 'uuid';
import { Inject, Injectable } from '@nestjs/common';
import { EDITORA } from './editora.entity';
import { Repository } from 'typeorm';
import { CriaEditoraDTO } from './dto/criaEditora.dto';
import { RetornaEditoraDto } from './dto/retornaEditora.dto';
import { AlteraEditoraDTO } from './dto/alteraEditora';

@Injectable()
    export class editoraServise {
        constructor(
            @Inject('EDITORA_REPOSITORY')
            private readonly editoraRepository: Repository<EDITORA>,
            ) {}
          
            async listar(): Promise<EDITORA[]> {
              return this.editoraRepository.find();
            }
          
            async inserir(dados: CriaEditoraDTO): Promise<RetornaEditoraDto> {
              let autor = new EDITORA();
              EDITORA.ID = uuid();
              EDITORA.NOME = dados.NOME;
              EDITORA.LOGO = dados.LOGO;
              EDITORA.QUADRINHO = dados.QUADRINHO;
          
              return this.editoraRepository
                .save(EDITORA)
                .then((result) => {
                  return <RetornaEditoraDto>{
                    status: 'Editora Criada',
                    editora: EDITORA,
                  };
                })
                .catch((error) => {
                  return <RetornaEditoraDto>{
                    status: 'Erro ao criar o Editora',
                    editora: error,
                  };
                });
            }
          
            async alterar(id: string, dados: AlteraEditoraDTO): Promise<RetornaEditoraDto> {
              const editora = await this.localizarID(id);
          
              Object.entries(dados).forEach(([chave, valor]) => {
                if (chave === 'id') {
                  return;
                }
                editora[chave] = valor;
              });
          
              return this.editoraRepository
                .save(editora)
                .then((result) => {
                  return <RetornaEditoraDto>{
                    status: 'Editora Alterado',
                    editora: editora,
                  };
                })
                .catch((error) => {
                  return <RetornaEditoraDto>{
                    status: 'Erro ao alterar o Editora',
                    editora: error,
                  };
                });
            }
            localizarID(ID: string): Promise<EDITORA> {
              return this.editoraRepository.findOne({
                where: {
                  ID,
                },
              });
            }
           
        }