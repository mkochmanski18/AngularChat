import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

export class ConversationDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    ownerID: string;
}
export class ConversationWithPDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    ownerID: string;

    @ApiProperty()
    participants: string[];
}