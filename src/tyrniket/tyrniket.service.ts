import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BadRequestException } from '@nestjs/common'
import { tyrniketDto } from './tyrniket.dto';
import { zdanieDto } from './zdanie.dto';

@Injectable()
export class TyrniketService {
    constructor(private prisma: PrismaService) {}

    async add(dto:tyrniketDto) {
        const poisk = await this.prisma.tyrniket.findFirst({
            where: {
                zdanie: dto.zdanie,
                info:dto.info
            }})
        if (poisk) {
            throw new BadRequestException('Турникет уже есть в базе')
        }
        const tyrniket = this.prisma.tyrniket.create({
            data: {
                zdanie: dto.zdanie,
                info: dto.info
            }
        })
        return tyrniket
    }

    async all() {
        return await this.prisma.tyrniket.findMany({
            include: {
                Zdanie: {
                    select: {
                        info: true
                    }
                },
            },
            orderBy: {
                zdanie: 'asc'
            }
        })
    }

    async addZdanie(dto:zdanieDto) {
        const zdanie = await this.prisma.zdanie.create({
            data: {
                info: dto.info
            }
        })
        return zdanie
    }

    async Zdanie() {
        const Zdanie = await this.prisma.zdanie.findMany()
        return Zdanie
    }
}
