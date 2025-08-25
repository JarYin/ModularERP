import { Injectable } from '@nestjs/common';

export type User = {
    userId: number,
    email: string,
    password: string
}

const users: User[] = [
    {
        userId: 1,
        email: 'user1@example.com',
        password: 'password1'
    },
    {
        userId: 2,
        email: 'user2@example.com',
        password: 'password2'
    }
];

@Injectable()
export class UsersService {
    async findByEmail(email: string): Promise<User | undefined> {
        return users.find(user => user.email === email);
    }
}
