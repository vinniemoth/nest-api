import { Controller, Post, Body, Get } from '@nestjs/common';
import { AdminArmazenado } from './admin.dm';
import { AdminEntity } from './admin.entity';
import { v4 as uuid } from 'uuid';
import { CriaAdminDTO } from './dto/criaAdmin.dto';
import { retornaAdminDTO } from './dto/retornaAdmin.dto';
import { ListaAdminDTO } from './dto/listaAdmin.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginAdminDTO } from './dto/loginAdmin.dto';

@ApiTags('Usuários')
@Controller('/admin')
export class AdminController {
  constructor(private Admins: AdminArmazenado) {}

  @ApiResponse({
    status: 201,
    description: 'Retorna que o admin foi criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Retorna que houve erro ao criar admin. Verifique os dados.',
  })
  @Post()
  async criaAdmin(@Body() dadosAdmin: CriaAdminDTO) {
    let novoAdmin = new AdminEntity(
      uuid(),
      dadosAdmin.nome,
      dadosAdmin.email,
      dadosAdmin.senha,
    );
    this.Admins.adicionarAdmin(novoAdmin);
    let retorno = new retornaAdminDTO('Admin Criado', novoAdmin);
    return retorno;
  }

  @Post("/login")
  // async fazerLogin(@Body() dadosLogin:loginAdminDTO){
  //   let retornoLogin = this.Admins.login(dadosLogin.email, dadosLogin.senha);
  //   let retorno = new retornaAdminDTO(retornoLogin.status?"Login efetuado":"Email ou senha inválidos",retornoLogin.usuario);
  //   return retorno;
  // }

  @ApiResponse({
    status: 200,
    description: 'Retorna que houve sucesso ao encontrar os admins',
  })
  @ApiResponse({
    status: 500,
    description: 'Retorna que não houve sucesso ao encontrar os admins',
  })
  @Get()
  async retornaAdmin() {
    let adminsListados = this.Admins.Admins;
    const listaAdmins = adminsListados.map(
      (admins) => new ListaAdminDTO(admins.id, admins.nome, admins.email),
    );
    return { admins: listaAdmins };
  }
}
