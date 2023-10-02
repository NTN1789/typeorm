import { Controller, Post, Body, Headers, UseGuards, Request, UseInterceptors, ParseFilePipe , FileTypeValidator, MaxFileSizeValidator} from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth.login.dto";
import { AuthRegisterDto } from "./dto/auth.Register.dto";
import { AuthRecuperacaoDto } from "./dto/auth.Recuperacao.dto ";
import { AuthResetDto } from "./dto/auth.Reset.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthMeDto } from "./dto/auth.Me.dto";
import { AuthGuard } from "./guards/auth.guard";
import { User } from "src/decorators/user-id.decorator";
import { FileInterceptor , FilesInterceptor,FileFieldsInterceptor} from "@nestjs/platform-express";
import { UploadedFile, UploadedFiles } from "@nestjs/common/decorators"

import { join } from "path";
import { FileService } from "src/file/file.service";

@Controller('auth') // caminho /auth será autenticação 
export class authCotroller{


        constructor(private readonly userService:UserService, 
                    private readonly authService:AuthService,
                    private readonly fileService:FileService
                        ) {} // agora tem acesso a esse serviço


        // rota login
        @Post('login')
        async login(@Body() {email,senha}: AuthLoginDto){
            return await this.authService.login(email,senha);   

                }

        //cadastro
        @Post('register')
        // pegando codigo do user.Service.ts e aproveitando no cadastro , o user.service tem que colocar no module  para usar ele no exemplo a seguir vamos colocar no auth.module  
        async register(@Body() body: AuthRegisterDto){
           

            return this.authService.register(body);
        }


        @Post('recuperacao')   // recuperação de senha

        async recuperacao(@Body()  {email}: AuthRecuperacaoDto){
            return await this.authService.recuperacaoDeSenha(email);
        }


        @Post('reset') // trocar a senha 

        async reset(@Body() {senha,token}:AuthResetDto){
            return await this.authService.reset(senha,token); 

        }


        @UseGuards(AuthGuard) // proteção de rotas
        @Post('me') 

        async me(@User('email') user){
                       //dar para ter acesso só o id          
           return {me: 'ok' , user};
            // agora além de verificar os dados do token , vai poder  verificar o user
        }


        @UseInterceptors(FileInterceptor('file'))
        @UseGuards(AuthGuard) // proteção de rotas
        @Post('photo') 
        async  uploadPhoto(@User() user , @UploadedFile( new ParseFilePipe({validators: [

            new FileTypeValidator({fileType: 'image/png'}), 
            new MaxFileSizeValidator({maxSize: 1024* 50 }) // tamanho do arquivo
        ]
        
        
        } )) 
       
       
        photo:Express.Multer.File) {
            const path  = join(__dirname ,'..', '..', 'storage', 'photos', ` photo-${user.id}.png` )  // dados do arquivo , conseguir 
            
      try {
          await this.fileService.upload(photo, path );
        
      } catch (error) {
            throw new Error(error);
      }


        return {sucess: true}
            // agora além de verificar os dados do token , vai poder  verificar o user
        }




        @UseInterceptors(FilesInterceptor('files'))
        @UseGuards(AuthGuard) // proteção de rotas
        @Post('files') 
        async  uploadFiles(@User() user , @UploadedFiles() files:Express.Multer.File[]){
                                            // o uploadedFiles pegar vários arquivos
        return  files
        }



        
        @UseInterceptors(FileFieldsInterceptor([{
            name: 'photo' ,
            maxCount: 1         // quantidade de arquivos dentro do da  foto 

       
        } ,{
            name: 'documents',
            maxCount: 10 
        } ]))
        @UseGuards(AuthGuard) // proteção de rotas
        @Post('files-fileds') 
        async  uploadFilesFileds(@User() user , @UploadedFiles() files:{photo : Express.Multer.File , documents: Express.Multer.File[]}){
                                            // o uploadedFiles pegar vários arquivos
        return  files
  
        
        }













    }

