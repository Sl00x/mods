export interface CreateUserDto {
  email: string;
  username: string;
  lastname: string;
  firstname: string;
  phone: string;
}

export type UpdateUserDto = Partial<CreateUserDto>;

export interface User {
  id?: string;
  email: string;
  username: string;
  password: string;
  lastname?: string;
  firstname?: string;
  phone?: string;
  avatar?: string;
}
