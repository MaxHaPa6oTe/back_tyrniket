import { IsNumber, IsString } from "class-validator";

export class OtmetkaDto {
    @IsNumber()
    tyrniket: number

    @IsString()
    worker: string
}