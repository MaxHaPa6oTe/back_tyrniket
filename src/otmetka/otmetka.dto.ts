import { IsNumber, IsString } from "class-validator";

export class OtmetkaDto {
    @IsNumber()
    tyrniket: number

    @IsNumber()
    worker: number
}