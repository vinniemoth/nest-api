import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ADMIN } from './admin.entity';
import { v4 as uuid } from 'uuid';
import { CriaAdminDTO } from './dto/criaAdmin.dto';
import { retornaAdminDTO } from './dto/retornaAdmin.dto';
import { ListaAdminDTO } from './dto/listaAdmin.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginAdminDTO } from './dto/loginAdmin.dto';
import { AdminService } from './admin.service';
import { AlteraAdminDTO } from './dto/alteraAdmin.dto';

@ApiTags('Usuários')
@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async criaAdmin(@Body() dados: CriaAdminDTO): Promise<retornaAdminDTO> {
    return this.adminService.inserir(dados);
  }

  @Get('listar')
  async listar(): Promise<ADMIN[]> {
    return this.adminService.listar();
  }

  @Get('ID-:id')
  async listarID(@Param('id') id: string): Promise<ADMIN> {
    return this.adminService.localizarID(id);
  }

  @Put(':id')
  async alterarAdmin(
    @Body() dados: AlteraAdminDTO,
    @Param('id') id: string,
  ): Promise<retornaAdminDTO> {
    return this.adminService.alterar(id, dados);
  }

  // ** Criação do admin **
  // @ApiResponse({
  //   status: 201,
  //   description: 'Retorna que o admin foi criado com sucesso.',
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Retorna que houve erro ao criar admin. Verifique os dados.',
  // })
  // @Post()
  // async criaAdmin(@Body() dadosAdmin: CriaAdminDTO) {
  // let novoAdmin = new Admin(
  //   uuid(),
  //   dadosAdmin.nome,
  //   dadosAdmin.email,
  //   dadosAdmin.senha,
  // );
  // this.adminService.adicionarAdmin(novoAdmin);
  // let retorno = new retornaAdminDTO('Admin Criado', novoAdmin);
  // return retorno;
  // }

  // ** Login do Admin **
  // @Post('/login')
  // async fazerLogin(@Body() dadosLogin: loginAdminDTO) {
  // let retornoLogin = this.Admins.loginAdmin(
  //   dadosLogin.email,
  //   dadosLogin.senha,
  // );
  // let retorno = new retornaAdminDTO(
  //   retornoLogin.status ? 'Login efetuado' : 'Email ou senha inválidos',
  //   retornoLogin.usuario,
  // );
  // return retorno;
}

// ** Retorno de Admin **
//   @ApiResponse({
//     status: 200,
//     description: 'Retorna que houve sucesso ao encontrar os admins',
//   })
//   @ApiResponse({
//     status: 500,
//     description: 'Retorna que não houve sucesso ao encontrar os admins',
//   })
//   @Get()
//   async retornaAdmin() {
//     let adminsListados = this.adminService;
//     const listaAdmins = adminsListados.map(
//       (admins) => new ListaAdminDTO(admins.id, admins.nome, admins.email),
//     );
//     return { admins: listaAdmins };
//   }
// }
