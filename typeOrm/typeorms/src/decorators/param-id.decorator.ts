import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const ParamId = createParamDecorator( (data:unknown, ctx:ExecutionContext)  => {
                                                             //context           

    return Number(ctx.switchToHttp().getRequest().params.id); // pegando o id do params 
    // ta usando o paramid pegar o  protocolo http e pegar o id  
    

                         
         
         
 });