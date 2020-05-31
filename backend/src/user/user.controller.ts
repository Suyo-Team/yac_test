import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signIn')
  signIn(@Body() loginDto: UserDto) {
    return this.userService.singIn(loginDto);
  }

  @Post('/signUp')
  register(@Body() registerDto: UserDto) {
    return this.userService.signUp(registerDto);
  }
}
