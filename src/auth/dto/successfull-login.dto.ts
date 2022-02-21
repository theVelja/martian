import { ApiProperty } from '@nestjs/swagger';

export class SuccessfullLoginDto {
    @ApiProperty()
    readonly access_token: string;
}