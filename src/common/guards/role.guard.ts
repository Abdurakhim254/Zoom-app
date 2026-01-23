import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Roles } from '../enums';

@Injectable()
export class RoleGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.user?.role || req.user?.role === Roles.ADMIN) {
      return true;
    }
    if (req.params.id !== req.user.id) {
      throw new ForbiddenException('Forbidden user');
    }
    return true;
  }
}
