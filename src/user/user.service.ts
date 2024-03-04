import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserInput, UpdateUserInput } from './dto/user.inputs';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(user: CreateUserInput): User {
    const newUser = { id: uuidv4(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  update(input: UpdateUserInput): User {
    const user = this.findOne(input.id);
    if (user) {
      Object.assign(user, input);
    }
    return user;
  }

  delete(id: string): User {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      return this.users.splice(index, 1)[0];
    }
    return null;
  }
}
