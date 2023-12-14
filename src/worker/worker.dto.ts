import { IsString, IsNumber } from "class-validator";

export class workerDto {
    @IsString()
    otdel: string

    @IsString()
    fio: string

    @IsString()
    phone: string
    // @IsNumber()
    // phone: number
    @IsString()
    karta: string
    // @IsNumber()
    // karta: number
}