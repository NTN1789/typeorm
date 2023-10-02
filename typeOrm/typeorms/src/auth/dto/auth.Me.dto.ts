import {IsJWT } from "class-validator";

export class AuthMeDto {
        // trocar senha 



        @IsJWT()
        token: string;


}