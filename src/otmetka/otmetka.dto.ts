import { IsString } from "class-validator";

export class OtmetkaDto {
    @IsString()
    DataS: string

    @IsString()
    DataP?: string
}