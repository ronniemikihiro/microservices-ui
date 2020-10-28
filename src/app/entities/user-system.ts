import { Role } from './role';

export class UserSystem {
    id: number;
    name: string;
    password: string;
    email: string;
    roles: Role[];
}