import { ExecutionContext, createParamDecorator, NotFoundException } from "@nestjs/common";

export const User = createParamDecorator( (filter:string, ctx:ExecutionContext)  => {
                                                                          //context           

    const request = ctx.switchToHttp().getRequest(); // pegando o id do params 
    // ta usando o paramid pegar o  protocolo http e pegar o id  
    

   if (request.user) {
      
      if (filter) {
         return request.user[filter];     //dados filtrados
      }
      else {
         return request.user;       // vai pegar o usuario inteiro
      }
   }     
     else  {
         throw new NotFoundException('User not found');
      
      } 
   })

         
