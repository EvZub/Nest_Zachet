import {Controller, Delete, Get, Post, Put, UseGuards, Request} from '@nestjs/common';
import { AppService } from './app.service';
import {UsersService} from "./services/users/users.service";
import {AuthGuard} from "@nestjs/passport";

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return "hi";
  }

  @Post()
  sendAll(): string {
    return "post data";
  }

  @Put()
  update(): string {
    return "put data";
  }

  @Delete()
  delete(): string {
    return "delete data";
  }
}