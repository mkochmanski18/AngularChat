import { ApiProperty } from '@nestjs/swagger';

export class UserdataUpdateDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  gender:string;

  @ApiProperty()
  email: string;
  
}