import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto & { userId: string }) {
    const result = await this.prismaService.$transaction(async (prisma) => {
      const partner = await prisma.partner.create({
        data: {
          name: createPartnerDto.name,
        },
      });

      await prisma.partnerUser.create({
        data: {
          partnerId: partner.id,
          userId: createPartnerDto.userId,
        },
      });

      return partner;
    });

    return result;
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    const partner = await this.prismaService.partner.update({
      where: {
        id,
      },
      data: {
        name: updatePartnerDto.name,
      },
    });

    return partner;
  }
}
