import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { workerDto } from './worker.dto';
import { FileService } from './file/file.service';
import { PoiskDto } from './posik.dto';

@Injectable()
export class WorkerService {
    constructor(private prisma: PrismaService,
        private fileService: FileService) {}

    async create(body: workerDto, photo: any) {
        let d = new Date()
        d.setHours(d.getHours() + 3)
        d.toISOString()
        const uniqPhone = await this.prisma.worker.findUnique({where: {phone: body.phone}})
        if (uniqPhone) {
            throw new BadRequestException('Этот номер уже существует')
        }
        const uniqKarta = await this.prisma.worker.findUnique({where: {karta: body.karta}})
        if (uniqKarta) {
            throw new BadRequestException('Эта карта уже занята')
        }
        const fileName = await this.fileService.createFile(photo);
        const worker = await this.prisma.worker.create({
            data: {
                fio: body.fio,
                otdel: body.otdel,
                phone: body.phone,
                karta: body.karta,
                photo: fileName,
                createdAt: d
            }
        })
        for(let i = 0; i < body.dostyp.length; i++) {
            await this.prisma.dostyp.create({data:{
                workerId: worker.id,
                zdanieId: Number(body.dostyp[i])
            }})
        }
        return worker
    }

    async del(idRaba:number) {
        const workerPoisk = await this.prisma.worker.findUnique({where: {id: +idRaba}})
        if (workerPoisk) {
            await this.prisma.worker.delete({where: {id:+idRaba}})
        }
        return {
            message: 'Работник удален',
        }
    }

    async update(id:number,body:workerDto,file:any) {
        const workerPoisk = await this.prisma.worker.findUnique({where: {id: +id}})
        if (!workerPoisk) {
            throw new BadRequestException('Не могу найти работника под этим id')
        }
        const uniqPhone = await this.prisma.worker.findFirst({where: {phone: body.phone, id: {not: +id}}})
        if (uniqPhone) {
            throw new BadRequestException('Этот номер уже существует')
        }
        const uniqKarta = await this.prisma.worker.findFirst({where: {karta: body.karta,id:{not: +id}}})
        if (uniqKarta) {
            throw new BadRequestException('Эта карта уже занята')
        }
        const {fio,otdel,phone,karta} = body
        let fileName:string
        if (file) {
            fileName = await this.fileService.createFile(file);
        } else {
            fileName = workerPoisk.photo
        }
            await this.prisma.worker.update({
            where: {
                id:+id
            },
            data: {
                fio,
                otdel,
                phone: phone,
                karta: karta,
                photo: fileName,
                createdAt: workerPoisk.createdAt
            }
        })
    return {
        message: 'Данные работника изменены'
    }
    }

    async obzorRaba (id:number) {
        const worker = await this.prisma.worker.findUnique({where: {id: +id}})
        if (!worker) {
            throw new BadRequestException('Не могу найти работника под этим id')
        }
        return worker
    }

    async poiskAll (body:PoiskDto) {
        const workers = await this.prisma.worker.findMany({
          where: {
            fio: {
                contains: body.fio,
                mode:'insensitive'
            }
          },
          take: body.skolkoNado || 5
        })
        const count = await this.prisma.worker.count({
            where: {
                fio: {
                    contains: body.fio,
                    mode:'insensitive'
                }
            }
        })
        return {workers,count}
    }

    async addOldWorkers() {
        return
    }
}