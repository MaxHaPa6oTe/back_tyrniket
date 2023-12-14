import { IsNumber } from "class-validator";

export class dostypDto {
    @IsNumber()
    tyrniket: number

    @IsNumber()
    worker: number
}