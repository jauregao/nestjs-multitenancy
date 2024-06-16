import { RolesGuard } from './../auth/roles/roles.guard';
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
import { Roles } from 'src/auth/roles/roles.decorator';
import { UserRoles } from 'src/auth/users/user-roles';

@UseInterceptors(TenantInterceptor)
@UseGuards(AuthGuard, RolesGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Roles(UserRoles.PARTNER, UserRoles.ADMIN)
  @Post()
  async create(@Body() createEventDto: CreateEventDto, @Res() res: Response) {
    const event = await this.eventsService.create(createEventDto);
    return res.status(HttpStatus.CREATED).json(event);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const events = await this.eventsService.findAll();
    return res.status(HttpStatus.OK).json(events);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const event = await this.eventsService.findOne(id);
    return res.status(HttpStatus.OK).json(event);
  }

  @Roles(UserRoles.PARTNER, UserRoles.ADMIN)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Res() res: Response,
  ) {
    const event = await this.eventsService.update(id, updateEventDto);
    return res.status(HttpStatus.CREATED).json(event);
  }

  @Roles(UserRoles.PARTNER, UserRoles.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    this.eventsService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).json();
  }
}
