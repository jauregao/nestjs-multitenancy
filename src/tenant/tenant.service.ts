import { Injectable } from '@nestjs/common';
import { Partner } from '@prisma/client';

@Injectable()
export class TenantService {
  private tenant: Partner;

  setTenant(tenant: Partner) {
    this.tenant = tenant;
  }

  getTenant(): Partner {
    return this.tenant;
  }
}
