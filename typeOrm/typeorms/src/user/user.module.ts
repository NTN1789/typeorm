import { MiddlewareConsumer, Module, NestModule, RequestMethod, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

import { AuthModule } from "src/auth/auth.Module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entinty";
// importando o userService no provider

// importando o PrismaModule para aplicação não dar erro 
@Module({
    imports:[
        forwardRef(()  => AuthModule), // fazendo comunicação ao Auth
        TypeOrmModule.forFeature([UserEntity])
    ],
  // importando o prismaModule para usar no service tem que fazer uma comunicação entre o prisma module
    controllers:[  UserController], // importando o controle da aplicação 
    providers:[UserService  ] , // prover um serviço , através  
    exports:[UserService]
})  
export class UserModule  implements  NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply().forRoutes(UserController, {
    
            path: 'users/:id',
            method: RequestMethod.ALL, // pegar todos os metódos 
            // o id do usarios
        })
      

    }
}

