import { TenantService } from './../tenant/tenant.service';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Injectable()
export class EventsService {
  constructor(
    private readonly prismaService: PrismaService,
    private tenantService: TenantService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = await this.prismaService.events.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        date: new Date(createEventDto.date),
        partnerId: this.tenantService.getTenant().id,
      },
    });

    return event;
  }

  async findAll() {
    const events = await this.prismaService.events.findMany();
    return events;
  }

  async findOne(id: string) {
    const event = await this.prismaService.events.findFirst({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found.');
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.prismaService.events.findFirst({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found.');
    }

    const updatedEvent = await this.prismaService.events.update({
      where: {
        id,
      },
      data: {
        ...updateEventDto,
      },
    });

    return updatedEvent;
  }

  async remove(id: string) {
    const event = await this.prismaService.events.findFirst({
      where: {
        id,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found.');
    }
  }
}
