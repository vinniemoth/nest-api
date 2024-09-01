import { Controller, Post, Body, Get } from '@nestjs/common';
import { AdminArmazenado } from './admin.dm';
import { AdminEntity } from './admin.entity';
import { v4 as uuid } from 'uuid';
import { CriaAdminDTO } from './dto/criaAdmin.dto';
import { retornaAdminDTO } from './dto/retornaAdmin.dto';
import { ListaAdminDTO } from './dto/listaAdmin.dto';

@Controller('/admin')
export class AdminController {
  constructor(private Admins: AdminArmazenado) {}

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

  @Get()
  async retornaAdmin() {
    let adminsListados = this.Admins.Admins;
    const listaAdmins = adminsListados.map(
      (admins) => new ListaAdminDTO(admins.id, admins.nome, admins.email),
    );
    return { admins: listaAdmins };
  }
}
