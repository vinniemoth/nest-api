import { Injectable } from "@nestjs/common";
import { AutorEntity } from "./autor.entity";
import { AlteraAutorDTO } from "./dto/alteraAutor";

@Injectable()
   export class AutorArmazenada {
    private autores: AutorEntity[] = [];

    adcionarAutor(autor: AutorEntity){
        this.autores.push(autor);
    }

    pesquisaID(id:string){
        const possivelQuadrinho = this.autores.find(
            (autorSalva) => autorSalva.id === id
        )
        if(!possivelQuadrinho){
            throw new Error("ID do Autor não encontrado");
        }
        return possivelQuadrinho;
    }

    alteraAutor(id:string, dadosNovos:AlteraAutorDTO){
        const possivelAutor = this.pesquisaID(id);
        Object.entries(dadosNovos).forEach(([chave,valor]) => {
            if(chave === 'id'){
                return;
            }
            possivelAutor[chave] = valor;
        });
    }

    removeAutor(id:string){
        const autor = this.pesquisaID(id);
        this.autores = this.autores.filter(
            (autorSalva) => autorSalva.id !== id
        );
        return autor;
    }
    get Autores (){
        return this.autores;
    }
   }
