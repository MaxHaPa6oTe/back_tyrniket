import { IsString } from "class-validator";

export class dostypDto {
    @IsString()
    karta: string

    zdanie: number[]
}