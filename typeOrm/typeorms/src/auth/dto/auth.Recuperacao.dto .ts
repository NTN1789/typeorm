import { IsEmail} from "class-validator";

export class AuthRecuperacaoDto {

        @IsEmail()
        email:string;




}