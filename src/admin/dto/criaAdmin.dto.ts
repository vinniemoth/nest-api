import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CriaAdminDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Carlos Eduardo',
    description:
      'Nome usado como identificador do administrador, tal qual QUEM subiu ou alterou os dados',
  })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'carloseduardo@example.com',
    description:
      'Email usado como identificador do administrador, e para Login',
  })
  email: string;

  // @Exclude()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    example: 'carlosEduardo123',
    description: 'Senha utilizada para fazer login',
  })
  senha: string;
}
