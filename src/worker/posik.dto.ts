import { IsNumber, IsString } from "class-validator";

export class PoiskDto {
    @IsNumber()
    skolkoNado: number

    @IsString()
    fio: string
}