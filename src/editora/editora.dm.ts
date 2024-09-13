import { Injectable } from "@nestjs/common";
import { EditoraEntity } from "./editora.entity";
import { AlteraEditoraDTO } from "./dto/alteraEditora";

@Injectable()
   export class EditoraArmazenada {
    private editoras: EditoraEntity[] = [];

    adcionarEditora(editora: EditoraEntity){
        this.editoras.push(editora);
    }

    pesquisaID(id:string){
        const possivelQuadrinho = this.editoras.find(
            (editoraSalva) => editoraSalva.id === id
        )
        if(!possivelQuadrinho){
            throw new Error("ID da Editora não encontrado");
        }
        return possivelQuadrinho;
    }

    alteraEditora(id:string, dadosNovos:AlteraEditoraDTO){
        const possivelEditora = this.pesquisaID(id);
        Object.entries(dadosNovos).forEach(([chave,valor]) => {
            if(chave === 'id'){
                return;
            }
            possivelEditora[chave] = valor;
        });
    }

    removeEditora(id:string){
        const editora = this.pesquisaID(id);
        this.editoras = this.editoras.filter(
            (editoraSalva) => editoraSalva.id !== id
        );
        return editora;
    }
    get Editoras (){
        return this.editoras;
    }
   }
