import { IsString } from "class-validator";

export class zdanieDto {
    @IsString()
    info: string
}