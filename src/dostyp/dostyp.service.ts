import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { dostypDto } from './dostyp.dto';

@Injectable()
export class DostypService {
    constructor(private prisma:PrismaService) {}

    async datDostyp(dto:dostypDto) {
        // const provekra = await this.prisma.dostyp.findFirst({
        //     where: {zdanieId: dto.zdanie, workerId: dto.worker}
        // })
        // if (provekra) {
            return {
                message: 'Доступ выдан'
            }
        // }
        // const dostyp = await this.prisma.dostyp.create({
        //     data: {
        //         zdanieId: dto.zdanie,
        //         workerId: dto.worker,
        //     }
        // })
        // return dostyp
        // const newWorker = await this.prisma.worker.findUnique({
        //     where: dto.karta
        // })
        // dto.checkedValues.map(o=>
        //     this.prisma.dostyp.create({
        //         data: {
        //             zdanieId: dto.zdanie,
        //             workerId: newWorker.id
        //         }
        //     }))
    }

    async ybratDostyp(dto:dostypDto) {
        // const provekra = await this.prisma.dostyp.findFirst({
        //     where: {zdanieId: dto.zdanie, workerId: dto.worker}
        // })
        // const dostyp = await this.prisma.dostyp.deleteMany({
        //     where: {
        //         zdanieId: dto.zdanie,
        //         workerId: dto.worker
        //     }
        // })
        // if (!provekra || dostyp) {
        return {
            message: 'У сотрудника больше нет доступа'
        }
    // }
    }

    async proverkaDostypa(dto:dostypDto) {
        const worker = await this.prisma.worker.findFirst({
            where: {
                uid: dto.worker
            }
        })
        if (!worker) {
            return false
        }
        const provekra = await this.prisma.dostyp.findFirst({
            where: {zdanieId: dto.zdanie, workerId: +worker.id}
        })
        if (provekra) {
            return true
        } else {
            return {
                message: 'ошибка'
            }
        }
    }

    async addOld() {
        const XLSX = require("xlsx");

        let workbook = XLSX.readFile("./src/dostyp/type.xlsx")
        
        let worksheet = workbook.Sheets[workbook.SheetNames[0]]
        
        let data = XLSX.utils.sheet_to_json(worksheet)

        let y = 'ФИО'
        for (let i = 0; i < data.length; i++) {
            const dva = await this.prisma.worker.findFirst({
                where:{fio:data[i][y]}
            })
            if (dva) {
            await this.prisma.dostyp.create({
                data: {
                    workerId:dva.id,
                    zdanieId:1
                }
            })
        } else {
            continue;
        }
        }
        return 'готово'
    }
}
