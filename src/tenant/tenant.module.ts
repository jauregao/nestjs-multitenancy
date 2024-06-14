import { TenantInterceptor } from './tenant.interceptor';
import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Module({
  providers: [TenantService, TenantInterceptor],
})
export class TenantModule {}
