import { Role } from "../enums/role.enum";
import { CreateUserDto } from "../user/dto/Create.user.dto";

export  const CreateUser:CreateUserDto ={
    birthAt:'200-01-01',
     email:'natanalmeida040@gmail.com',
     nome:'natan almeida',
      senha:'Banjo2020@',
      role:Role.user 
} 