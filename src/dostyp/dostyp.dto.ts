import { IsNumber } from "class-validator";

export class dostypDto {
    @IsNumber()
    zdanie: number

    @IsNumber()
    worker: number
}