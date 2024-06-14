import { User } from '@prisma/client';

export class UserPresenter {
  constructor(readonly user: User) {}

  toJSON() {
    return {
      id: this.user.id,
      email: this.user.email,
      name: this.user.name,
      roles: this.user.roles,
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt,
    };
  }
}
