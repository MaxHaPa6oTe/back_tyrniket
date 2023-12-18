import { Injectable, BadRequestException, StreamableFile } from '@nestjs/common';
import { dostypDto } from 'src/dostyp/dostyp.dto';
import { PrismaService } from 'src/prisma.service';
import { utils, write } from 'xlsx';
import { OtmetkaDto } from './otmetka.dto';

@Injectable()
export class OtmetkaService {
    constructor(private prisma: PrismaService) {}

    async add(dto:dostypDto) {
        try {
        let d = new Date()
        d.setHours(d.getHours() + 3)
        d.toISOString()
        const worker = await this.prisma.worker.findUnique({
            where: {
                karta: String(dto.worker)
            }
        })
        if (!worker) {
            throw new BadRequestException('Не могу найти сотрудника')
        }
        await this.prisma.otmetka.create({data: {
                tyrniketId: dto.tyrniket,
                workerId: worker.id,
                createdAt: d
            }
        })
        return {
            message: 'Отметка добавлена'
        }
    } catch (e) {
        throw new BadRequestException('Отметка не добавилась, что-то пошло не так')
    }
    }

    async all(dto:OtmetkaDto) {
        const otmetki = await this.prisma.otmetka.findMany({
            where: {
                createdAt: {
                    gte: new Date(dto.DataS),
                    lte: new Date(dto.DataP),
                },
            },
            include: {
                tyrniket: {select: {
                    info: true
                }},
                worker: {select: {
                    fio: true
                }}
            },
        })
        return otmetki
    }

    async download() {
        const otmetki = await this.prisma.otmetka.findMany({
            where: {
                tyrniketId: 9,
                workerId: 1
            },
            include: {
                tyrniket: {select: {
                    info: true
                }},
                worker: {select: {
                    fio: true
                }}
            },
        })
        let arr = []
        otmetki.map(info=>{
            let arr1 = []
            // let date = info.dataCreate
            arr1.push(info.tyrniket.info)
            // arr1.push(date)
            arr1.push(info.worker.fio)
            arr.push(arr1)
        })
        const ws = utils.aoa_to_sheet(arr);
        const wb = utils.book_new(); utils.book_append_sheet(wb, ws, "Data");
        const buf = write(wb, {type: "buffer", bookType: "xlsx"});
        return new StreamableFile(buf);
    }
}
