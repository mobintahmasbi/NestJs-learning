import { Controller, Get } from '@nestjs/common';

@Controller('Users')
export class UserControllersController {
  @Get()
  getUser() {
    return [
      {
        userName: 'mobin',
        userPhoneNumber: '09035083850',
      },
    ];
  }
}
