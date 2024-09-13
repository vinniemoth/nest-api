import { AutorEntity } from '../autor.entity';

export class RetornaAutorDto {
  constructor(
    readonly status: string,
    readonly editora: AutorEntity,
  ) {}
}
