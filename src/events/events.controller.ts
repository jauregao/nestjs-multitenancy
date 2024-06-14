import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { TenantInterceptor } from 'src/tenant/tenant.interceptor';

@UseInterceptors(TenantInterceptor)
@UseGuards(AuthGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto, @Res() res: Response) {
    const event = this.eventsService.create(createEventDto);
    return res.status(HttpStatus.CREATED).json(event);
  }

  @Get()
  findAll(@Res() res: Response) {
    const events = this.eventsService.findAll();
    return res.status(HttpStatus.OK).json(events);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const event = this.eventsService.findOne(id);
    return res.status(HttpStatus.OK).json(event);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Res() res: Response,
  ) {
    const event = this.eventsService.update(id, updateEventDto);
    return res.status(HttpStatus.CREATED).json(event);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    this.eventsService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).json();
  }
}
