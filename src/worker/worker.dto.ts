import { IsString } from "class-validator";

export class workerDto {
    @IsString()
    otdel: string

    @IsString()
    fio: string

    @IsString()
    phone: string

    @IsString()
    karta: string
    
    @IsString()
    dostyp: string
}