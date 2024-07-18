import { CreateUserDto } from "./Create.user.dto";
import{PartialType} from '@nestjs/mapped-types';


export class UpdatePatchUserDto  extends  PartialType(CreateUserDto){
    // já vai usar tudo do createUserDTO através do extends
    // o PartialType e do nestjs , nele dar para refêrenciar as coisas 
    

}