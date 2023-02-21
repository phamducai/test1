import { Injectable, Req } from '@nestjs/common';
import { User, Note } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { AuthDTO } from './dto/auth.dto';
@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}
  async register(authDTO: AuthDTO) {
    //generate password to hashedPassword
    const hashedPassword = await argon.hash(authDTO.password);
    // insert data to database with
    const user = await this.prismaService.user.create({
      data: {
        email: authDTO.email,
        hashedPassword: hashedPassword,
        firstName: '',
        lastName: '',
      }, //only select id, email, createdAt
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
    return user;
  }

  login() {
    return {
      message: 'Login an user',
    };
  }
}
