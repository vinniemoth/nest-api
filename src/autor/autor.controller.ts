import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { AutorArmazenada } from "./autor.dm";
import { CriaAutorDTO } from "./dto/criaAutor.dto";
import { AutorEntity } from "./autor.entity";
import { v4 as uuid } from 'uuid';
import { RetornaAutorDto } from "./dto/retornaAutor.dto";
import { ListaAutorDTO } from "./dto/listaAutor.dto";
import { AlteraAutorDTO } from "./dto/alteraAutor";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Autor')
@Controller('/autor')
export class AutorController {
    constructor(private Autores: AutorArmazenada) { }

        //Criação
    @ApiResponse({status:201,
                description:'Retorna que o Autor foi criada com sucesso'})
    @ApiResponse({status:400,
                  description:'Retorna que não foi possível a criação da Autor,favor checar as informações'})
    
    @Post()
        async criaAutor(@Body()dadosAutor: CriaAutorDTO){
            let novaAutor = new AutorEntity(
                uuid(),
                dadosAutor.nome,
                dadosAutor.foto,
                dadosAutor.quadrinho //momentaneo até a criação do banco de dados
            );
            this.Autores.adcionarAutor(novaAutor);
            let retorno = new RetornaAutorDto('Autor Criada',novaAutor);
            return retorno;
    }

        //Pesquisa
    @ApiResponse({status:200,
                description:'Retorna o sucesso ao encontrar o autor'})
    @ApiResponse({status:500,
                  description:'Retorna que não foi possível encontrar o autor,favor checar as informações'})
    @Get()
        async RetornaAutor(){
            let autoresListados = this.Autores.Autores;
            const listaAutores = autoresListados.map(
                (autor) => new ListaAutorDTO(
                    autor.id,
                    autor.nome,
                    autor.foto,
                    autor.quadrinho
                )
            );
            return{
                Autores: listaAutores
            };
        };
        //Pesquisa por ID
    @ApiResponse({status:200,
                description:'Retorna que o id específico do Autor foi encontrado com sucesso'})
    @ApiResponse({status:500,
                  description:'Retorna que não foi possível encontrar a id da autor,favor checar as informações'})
    
    @Get('/:id')
        async pesquisaID(@Param('id') id:string){
            let autor = this.Autores.pesquisaID(id);
            const ListaRetorno = new ListaAutorDTO(
                autor.id,
                autor.nome,
                autor.foto,
                autor.quadrinho
            );
            return{
            Autor: ListaRetorno
        };
    };
        //Alteração
    @ApiResponse({status:200,
                  description:'Retorna que o Autor foi alterado com sucesso'})
    @ApiResponse({status:500,
                  description:'Retorna que não foi possível a alteração da Autor,favor checar as informações'})

    @Put('/:id')
        async alteraAutor(@Body()dadosNovos:AlteraAutorDTO,
                            @Param('id') id:string){
            let retornaEdicao = this.Autores.alteraAutor(id,dadosNovos,);
            return retornaEdicao;
        }

        //Delete
    @ApiResponse({status:200,
                  description:'Retorna que o Autor foi deletado com sucesso'})
    @ApiResponse({status:500,
                  description:'Retorna que não foi possível deletar a Autor,favor checar as informações'})

    @Delete('/:id')
        async removeFilme(@Param('id') id: string){
            var retornoExclusao = await this.Autores.removeAutor(id)
            var retorno = new RetornaAutorDto ('Exclusão Efetuada',retornoExclusao);        
            return retorno;
        }

}