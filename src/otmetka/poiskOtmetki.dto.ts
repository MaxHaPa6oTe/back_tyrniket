import { IsNumber, IsString, IsOptional } from "class-validator";

export class poiskOtmetkiDto {
    @IsString()
    DataS: string

    @IsString()
    DataP: string

    @IsOptional()
    worker?:number

    @IsNumber()
    zdanie:number
}