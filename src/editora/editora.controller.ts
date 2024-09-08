import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { EditoraArmazenada } from "./editora.dm";
import { CriaEditoraDTO } from "./dto/criaEditora.dto";
import { EditoraEntity } from "./editora.entity";
import { v4 as uuid } from 'uuid';
import { RetornaEditoraDto } from "./dto/retornaEditora.dto";
import { ListaEditoraDTO } from "./dto/listaEditora.dto";
import { AlteraEditoraDTO } from "./dto/alteraEditora";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Editora')
@Controller('/editora')
export class EditoraController {
    constructor(private Editoras: EditoraArmazenada) { }

        //Criação
    @ApiResponse({status:201,
                description:'Retorna que a Edidora foi criada com sucesso'})
    @ApiResponse({status:400,
                  description:'Retorna que não foi possível a criação da Editora,favor checar as informações'})
    
    @Post()
        async criaEditora(@Body()dadosEditora: CriaEditoraDTO){
            let novaEditora = new EditoraEntity(
                uuid(),
                dadosEditora.nome,
                dadosEditora.logo,
                dadosEditora.quadrinho //momentaneo até a criação do banco de dados
            );
            this.Editoras.adcionarEditora(novaEditora);
            let retorno = new RetornaEditoraDto('Editora Criada',novaEditora);
            return retorno;
    }

        //Pesquisa
    @ApiResponse({status:200,
                description:'Retorna o sucesso ao encontrar a editora'})
    @ApiResponse({status:500,
                  description:'Retorna que não foi possível encontrar a editora,favor checar as informações'})
    @Get()
        async RetornaEditora(){
            let editorasListadas = this.Editoras.Editoras;
            const listaEditoras = editorasListadas.map(
                (editora) => new ListaEditoraDTO(
                    editora.id,
                    editora.nome,
                    editora.logo,
                    editora.quadrinho
                )
            );
            return{
                Editoras: listaEditoras
            };
        };
        //Pesquisa por ID
    @ApiResponse({status:200,
                description:'Retorna que a Edidora com uma id específica foi encontrada com sucesso'})
    @ApiResponse({status:500,
                  description:'Retorna que não foi possível encontrar a id da editora,favor checar as informações'})
    
    @Get('/:id')
        async pesquisaID(@Param('id') id:string){
            let editora = this.Editoras.pesquisaID(id);
            const ListaRetorno = new ListaEditoraDTO(
                editora.id,
                editora.nome,
                editora.logo,
                editora.quadrinho
            );
            return{
            Editora: ListaRetorno
        };
    };
        //Aleteração
    @ApiResponse({status:200,
                  description:'Retorna que a Edidora foi alterada com sucesso'})
    @ApiResponse({status:500,
                  description:'Retorna que não foi possível a alteração da Editora,favor checar as informações'})

    @Put('/:id')
        async alteraEditora(@Body()dadosNovos:AlteraEditoraDTO,
                            @Param('id') id:string){
            let retornaEdicao = this.Editoras.alteraEditora(id,dadosNovos,);
            return retornaEdicao;
        }

        //Delete
    @ApiResponse({status:200,
                  description:'Retorna que a Edidora foi deletada com sucesso'})
    @ApiResponse({status:500,
                  description:'Retorna que não foi possível deletar a Editora,favor checar as informações'})

    @Delete('/:id')
        async removeFilme(@Param('id') id: string){
            var retornoExclusao = await this.Editoras.removeEditora(id)
            var retorno = new RetornaEditoraDto ('Exclusão Efetuada',retornoExclusao);        
            return retorno;
        }

}