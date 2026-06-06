import { SetMetadata } from '@nestjs/common';
import { META_ROLES } from '../constants/auth.constants';
import { Roles } from '../constants/roles.constants';

export const RoleProtected = (...args: Roles[]) => {
  return SetMetadata(META_ROLES, args);
};
