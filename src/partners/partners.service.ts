import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';

@Injectable()
export class PartnersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto & { userId: number }) {
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

  findAll() {
    return `This action returns all partners`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partner`;
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return `This action updates a #${id} partner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }
}
