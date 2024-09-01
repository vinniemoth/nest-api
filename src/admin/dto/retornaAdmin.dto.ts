import { AdminEntity } from '../admin.entity';

export class retornaAdminDTO {
  constructor(
    readonly status: string,
    readonly admin: AdminEntity,
  ) {}
}
