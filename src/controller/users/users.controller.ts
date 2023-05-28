import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import {User} from "../../shemas/user";
import {AuthGuard} from "@nestjs/passport";
import {UserDto} from "../../dto/user-dto";
import {UsersService} from "../../services/users/users.service";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {
    }
    @Get()
    getAllUsers():Promise<User[]>{
        return this.userService.getAllUsers()
    }
    @Get(':id')
    getUserById(@Param('id') id): Promise<User> {
        return this.userService.getUserById(id)
    }
    @Post()
    sendUsers(@Body()data):Promise<User>{
        return this.userService.checkRegUser(data.login).then((queryRes) =>{
            console.log('data reg', queryRes)
            if (queryRes.length ===0) {
                return this.userService.sendUsers(data)
            } else {
                console.log('err - user is exists')
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    errorText: 'Пользователь уже зарегистрирован',
                }, HttpStatus.CONFLICT);
            }
        })
    }

    @UseGuards(AuthGuard('local'))
    //логика проверки, формирования ошибки
    @Post(':login')
    authUser(@Body()data: UserDto,@Param('login') login): any{
        return this.userService.login(data)
    }


    @Put(':id')
    updateUsers(@Param('id')id,@Body()data ):Promise<User>{
        return this.userService.updateUsers(id, data)
    }
    @Delete()
    deleteUsers(): Promise<User>{
        return this.userService.deleteUsers()
    }
    @Delete(':id')
    deleteUsersById(@Param('id') id):Promise<User>{
        return this.userService.deleteUsersById(id)
    }
}