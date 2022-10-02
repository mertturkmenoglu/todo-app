import { User } from '../../common';

export type LoginResponseDto = Omit<User, 'fullName'>;
