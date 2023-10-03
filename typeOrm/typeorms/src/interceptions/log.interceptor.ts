import { NestInterceptor , ExecutionContext,CallHandler} from "@nestjs/common";
import {  Observable } from "rxjs";
import {  tap } from "rxjs/operators";
//Observable e um tipo de promise algo bem semelhante de se comparar 



export class LogInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        
        const dt = Date.now();
        
        
        // manipulador de rotas o handle
            return next.handle().pipe(tap(() => {


                // vendo a url que ta sendo acessada 
                const req = context.switchToHttp().getRequest();
                console.log(`url: ${req.url}`)
                

                // vendo a quantidade de tempo que demora para criar um usuario ou ver algo do CRUD
                console.log(`URL: ${req.url}`);
                console.log(`METHOD: ${req.method}`);
                console.log(`Execução levou: ${Date.now() - dt} milisegundos.`);

            }))


    }

}