import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ADMIN } from './admin.entity';
import { CriaAdminDTO } from './dto/criaAdmin.dto';
import { retornaAdminDTO } from './dto/retornaAdmin.dto';
import { ApiTags } from '@nestjs/swagger';
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

  @Get()
  async listar(): Promise<ADMIN[]> {
    return this.adminService.listar();
  }

  @Get('ID-:id')
  async listarID(@Param('id') id: string): Promise<ADMIN> {
    return this.adminService.localizarID(id);
  }

  @Put('ID-:id')
  async alterarAdmin(
    @Body() dados: AlteraAdminDTO,
    @Param('id') id: string,
  ): Promise<retornaAdminDTO> {
    return this.adminService.alterar(id, dados);
  }
}
