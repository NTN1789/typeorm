import { IsString   , IsEmail  , IsStrongPassword, IsOptional, IsDateString, IsEnum } from "class-validator"
import { Role } from "src/enums/role.enum";



export class CreateUserDto{
    @IsString()
    nome: string;

  // colocando o email sendo opcional
    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6 ,   // tem que ser até 6 ou mais carácter a senha 
        minNumbers:1, // tem que ter número na senha
        minUppercase: 1 , // uma parte maiúscula
        minLowercase: 0 , // uma parte minéscula
        minSymbols:1  // tem que colocar um símbolo na letra
    })
    senha: string;

    // criando data 
    @IsOptional()
    @IsDateString()
    birthAt: string;


    @IsOptional() 
    @IsEnum(Role) 
    role: number;
}