import { IsNumber, IsOptional, IsString } from "class-validator";

export class PoiskDto {
    @IsNumber()
    @IsOptional()
    skolkoNado?: number

    @IsString()
    fio: string
}