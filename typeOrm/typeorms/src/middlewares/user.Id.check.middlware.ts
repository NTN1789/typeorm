import { NestMiddleware, BadRequestException} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class  UserIdCheckMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
     // vai fazer todas as rotas com id , uma verificação antes de ir ao banco 

        // fazer ids que não tiver no banco 

        
        console.log('userIdcheckMiddlware', 'antes')

      if (isNaN(Number(req.params.id)) || Number (req.params.id) <= 0 ){ // não tem números negativos no banco 
            throw new BadRequestException('id inválido')

      } 
      console.log('userIdcheckMiddlware', 'depois')
      
      next();
    }

}