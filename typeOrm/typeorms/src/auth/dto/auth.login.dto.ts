import { IsEmail, IsString,  IsStrongPassword } from "class-validator";

export class AuthLoginDto {

        @IsEmail()
        email:string;


        @IsString()
        @IsStrongPassword({
                minLength: 6 ,   // tem que ser até 6 ou mais carácter a senha 
                minNumbers:1, // tem que ter número na senha
                minUppercase: 1 , // uma parte maiúscula
                minLowercase: 0 , // uma parte minéscula
                minSymbols:1  // tem que colocar um símbolo na letra
            })
        senha:string;

}