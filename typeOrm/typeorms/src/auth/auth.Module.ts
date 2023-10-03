import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { authCotroller } from "./auth.controller";
import { UserModule } from "src/user/user.module";

import { AuthService } from "./auth.service";

import { FileModule } from "src/file/file.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entity/user.entinty";

@Module({
    // vai retronar algo configurado
     imports:[JwtModule.register({
            secret:String (process.env.JWT_SECRET)
     }),
     
     forwardRef(() => UserModule), // faz a comunicação com o UserModule é para usar 
   
       // tem que exportar ainda para usar ele pelo o proprio user.modulo , na parte de exports . para poder usar em outros lugares 
       // para ter acesso ao banco de dados
     FileModule,
     TypeOrmModule.forFeature([UserEntity])
], 

     controllers:[authCotroller],
     providers:[AuthService],
     exports: [AuthService] // tem que exportar o AuthService 

})
export class AuthModule{

}