import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Header, StreamableFile, HttpCode, Param, Query, UseGuards } from '@nestjs/common';
import { OtmetkaService } from './otmetka.service';
import { dostypDto } from 'src/dostyp/dostyp.dto';
import { OtmetkaDto } from './otmetka.dto';
import { poiskOtmetkiDto } from './poiskOtmetki.dto';
import { utils, write } from 'xlsx';
import { JwtGuard } from 'src/auth/guards/jwt.guard';


@Controller('otmetka')
export class OtmetkaController {
  constructor(private readonly otmetkaService: OtmetkaService) {}

  @Post('add')
  @UsePipes(new ValidationPipe())
  async proverka(@Body() dto: OtmetkaDto) {
    return this.otmetkaService.add(dto)
  }

  @UseGuards(JwtGuard)
  @Post('poisk')
  @UsePipes(new ValidationPipe())
  async all(@Body() dto: poiskOtmetkiDto) {
    return this.otmetkaService.all(dto)
  }

  @UseGuards(JwtGuard)
  @Get('download')
  @HttpCode(200)
  @Header('Content-Disposition', 'attachment; filename="SheetJSNest.xlsx"')
  async downloadXlsxFile(@Query() dto:poiskOtmetkiDto): Promise<StreamableFile> {
    return this.otmetkaService.download(dto)
}
}