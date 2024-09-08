import { User } from 'src/users/entities/user.entity';

export type AuthenticatedRequest = Request & {
  user?: User;
};
