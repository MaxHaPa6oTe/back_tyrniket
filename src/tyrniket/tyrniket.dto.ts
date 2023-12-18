import { IsNumber, IsString } from "class-validator";

export class tyrniketDto {
    @IsNumber()
    zdanie: number

    @IsString()
    info: string
}