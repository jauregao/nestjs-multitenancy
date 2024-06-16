import { Injectable, Scope } from '@nestjs/common';
import { Partner } from '@prisma/client';

// 1 shared service - singleton (mesmo serviço para difetentes requisições)
// 2 scoped service | request service (serviço gerado por requisição)
//3 transient service (instancia do serviço gerado por requisição)
@Injectable({
  scope: Scope.REQUEST,
}) //shared service
export class TenantService {
  private tenant: Partner;

  setTenant(tenant: Partner) {
    this.tenant = tenant;
  }

  getTenant(): Partner {
    return this.tenant;
  }
}
