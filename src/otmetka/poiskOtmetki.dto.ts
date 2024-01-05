import { IsNumber, IsString, IsOptional } from "class-validator";

export class poiskOtmetkiDto {
    @IsString()
    DataS: string

    @IsString()
    DataP: string

    @IsOptional()
    worker?:string

    @IsString()
    zdanie:string
}