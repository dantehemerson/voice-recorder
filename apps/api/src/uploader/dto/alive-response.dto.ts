import { ApiProperty } from '@nestjs/swagger';

export class AliveResponseDto {
  @ApiProperty({
    description: 'Boolean that indicates if the server is alive',
  })
  ok: boolean;

  @ApiProperty({
    description: 'Current server time',
  })
  serverTime: Date;
}
