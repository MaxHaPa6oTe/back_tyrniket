import { Injectable, BadRequestException, StreamableFile } from '@nestjs/common';
import { dostypDto } from 'src/dostyp/dostyp.dto';
import { PrismaService } from 'src/prisma.service';
import { utils, write } from 'xlsx';

@Injectable()
export class OtmetkaService {
    constructor(private prisma: PrismaService) {}

    async add(dto:dostypDto) {
        try {
        const worker = await this.prisma.worker.findUnique({
            where: {
                karta: String(dto.worker)
            }
        })
        await this.prisma.otmetka.create({
            data: {
                tyrniketId: dto.tyrniket,
                workerId: worker.id
            }
        })
        return {
            message: 'Отметка добавлена'
        }
    } catch (e) {
        throw new BadRequestException('Отметка не добавилась, что-то пошло не так')
    }
    }

    async all(dto:dostypDto) {
        const otmetki = await this.prisma.otmetka.findMany({
            where: {
                tyrniketId: dto.tyrniket,
                workerId: dto.worker
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
            let date = info.createdAt.toString()
            arr1.push(info.tyrniket.info)
            arr1.push(date.substring(4, date.length - 37))
            arr1.push(info.worker.fio)
            arr.push(arr1)
        })
        const ws = utils.aoa_to_sheet(arr);
        const wb = utils.book_new(); utils.book_append_sheet(wb, ws, "Data");
        const buf = write(wb, {type: "buffer", bookType: "xlsx"});
        return new StreamableFile(buf);
    }
}
