import { IsNumber } from "class-validator";

export class dostypDto {
    @IsNumber()
    worker: number

    zdanie: number
}