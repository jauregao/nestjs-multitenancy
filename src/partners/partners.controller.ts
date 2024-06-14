import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';

@UseGuards(AuthGuard)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  create(
    @Body() createPartnerDto: CreatePartnerDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    const partner = this.partnersService.create({
      ...createPartnerDto,
      userId: req.user.id,
    });

    return res.status(HttpStatus.CREATED).json(partner);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnersService.update(+id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnersService.remove(+id);
  }
}
