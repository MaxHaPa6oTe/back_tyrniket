import { Controller, Post, Body, HttpCode, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { DostypService } from './dostyp.service';
import { dostypDto } from './dostyp.dto';
import { AdminJwtGuard } from 'src/auth/guards/admin.guard';

@Controller('dostyp')
export class DostypController {
  constructor(private readonly dostypService: DostypService) {}

  // @UseGuards(AdminJwtGuard)
  @Post('dat')
  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  async datDostyp(@Body() dto: dostypDto) {
    return this.dostypService.datDostyp(dto)
  }

  @UseGuards(AdminJwtGuard)
  @Post('ybr')
  @UsePipes(new ValidationPipe())
  async ybrDostyp(@Body() dto: dostypDto) {
    return this.dostypService.ybratDostyp(dto)
  }

  @Post('proverka')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async proverka(@Body() dto: dostypDto) {
    return this.dostypService.proverkaDostypa(dto)
  }
}
