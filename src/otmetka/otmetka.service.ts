import { Injectable, BadRequestException, StreamableFile } from '@nestjs/common';
import { dostypDto } from 'src/dostyp/dostyp.dto';
import { PrismaService } from 'src/prisma.service';
import { utils, write } from 'xlsx';
import { OtmetkaDto } from './otmetka.dto';
import { poiskOtmetkiDto } from './poiskOtmetki.dto';

@Injectable()
export class OtmetkaService {
    constructor(private prisma: PrismaService) {}

    async add(dto:OtmetkaDto) {
        try {
        let d = new Date()
        d.setHours(d.getHours() + 3)
        d.toISOString()
        const worker = await this.prisma.worker.findUnique({
            where: {
                uid: dto.worker
            }
        })
        if (!worker) {
            throw new BadRequestException('Не могу найти сотрудника')
        }
        const otmetka = await this.prisma.otmetka.create({data: {
                tyrniketId: dto.tyrniket,
                workerId: worker.id,
                createdAt: d
            }
        })
        return otmetka
    } catch (e) {
        throw new BadRequestException('Отметка не добавилась, что-то пошло не так')
    }
    }

    async all(dto:poiskOtmetkiDto) {
        const otmetki = await this.prisma.otmetka.findMany({
            where: {
                ...(dto.worker ? {workerId:+dto.worker} : {}),
                createdAt: {
                    gte: new Date(dto.DataS),
                    lte: new Date(dto.DataP),
                },
                tyrniket: {
                    zdanie: +dto.zdanie
                },
            },
            include: {
                tyrniket: {select: {
                    Zdanie: {select:{info:true}},
                    info: true
                }},
                worker: {select: {
                    fio: true
                }}
            }, 
        })
        return otmetki 
    }

    async download(dto:poiskOtmetkiDto) {
        const otmetki = await this.all(dto)
        let arr = []
        otmetki.map(infa=>{
            let arr1 = []
            arr1.push(infa.tyrniket.info)
            arr1.push(infa.createdAt)
            arr1.push(infa.worker.fio)
            arr.push(arr1)
        })
        const ws = utils.aoa_to_sheet(arr);
        const wb = utils.book_new(); utils.book_append_sheet(wb, ws, "Data");
        const buf = write(wb, {type: "buffer", bookType: "xlsx"});
        return new StreamableFile(buf);
    }
}
