import { IsNumber, IsString } from "class-validator";

export class dostypDto {
    @IsString()
    worker: string

    @IsNumber()
    zdanie: number
}