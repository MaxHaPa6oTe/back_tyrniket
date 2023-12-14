import { IsString } from "class-validator";

export class tyrniketDto {
    @IsString()
    info: string
}