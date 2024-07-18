import {IsJWT, IsString, MinLength } from "class-validator";

export class AuthResetDto {
        // trocar senha 

        @IsString()
        @MinLength(6) 
        senha:string;

        @IsJWT()
        token: string;


}