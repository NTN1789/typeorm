import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { Reflector } from "@nestjs/core";
import { Roles_Key } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";



@Injectable()
export class RoleGuard implements CanActivate{


        constructor(
            private readonly reflaction:Reflector
            ){}

       async  canActivate(context: ExecutionContext){
          

   const requireRoles =   this.reflaction.getAllAndOverride<Role[]>(Roles_Key, [context.getHandler() ,  context.getClass()])     // tudo que foi subscrito
                // ta aplicando globamente e pegando a classe


            if (!requireRoles) {
                    return true;
            }

            
            // quer extrair o usuario 
            const {user} =  context.switchToHttp().getRequest();
          
     const rolesFiltred =   requireRoles.filter(role => role === user.role )              //se dentro do array tem aregra do usuario se admin ou user 
 

            return rolesFiltred.length > 0 ; 
        // verificar a rota que eu apliquei o guard se possuir o role 

        // usando repleaction que tipo um espelho do cédigo 


      
}
  
       

        // usando repleaction que tipo um espelho do código 


      
}

