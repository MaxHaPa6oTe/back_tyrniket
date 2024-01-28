import { IsString } from "class-validator";

export class workerDto {
    @IsString()
    fio: string

    @IsString()
    post: string

    @IsString()
    birthday: string
    
    @IsString()
    uid: string;
    
    @IsString()
    dostyp: string
}