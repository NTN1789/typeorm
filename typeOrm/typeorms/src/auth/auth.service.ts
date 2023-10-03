import { Injectable , UnauthorizedException, BadRequestException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";





import { AuthRegisterDto } from "./dto/auth.Register.dto";
import { UserService } from "src/user/user.service";
import { UserEntity } from "src/user/entity/user.entinty";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from "typeorm"


@Injectable()
export class AuthService{
      private  issuer = 'login';
      private  audience = 'users';

    // importando o banco de dados o prisma 
    constructor (private readonly  jwtService:JwtService,
                 // tem que importar o prisma no auth.module para usar ele aqui
                
                 private readonly  userService: UserService ,
                  // importando o userService para usar os serviços deles 
                  @InjectRepository(UserEntity)
                  private readonly usersRepository:Repository<UserEntity>

                 ){} 
                 

       createToken(usuario:UserEntity){   // vai esperar um usuario e ta aproveitando um parte da tabela do banco de dados
            // criando um token 
           console.log({secret:process.env.JWT_SECRET })
        
            return {
                accessToken:  this.jwtService.sign({
                  // o que eu vou assinar aqui dentro ? 
                  // pode colocar tudo que ta dentro do usuario , só que não seria interessante

                    id: usuario.id, // id do usuario
                    nome: usuario.nome ,
                    email: usuario.email
                }, {
                      // tem outras informação para colocar 
                      expiresIn: "7 days",
                      subject:String(usuario.id),
                      issuer: this.issuer , 
                      audience:this.audience 
                    
              
                    })

            }

                    // vai usar o createToken quando logar
        }

        checkToken(token:string){
                //validando o token
          try {
            const data =  this.jwtService.verify(token , {
              audience: this.audience,
              issuer: this.issuer

           });
 
              return data;           
          } catch (e) {
              throw new BadRequestException(e);
          }


        
     
     
     
        }


          // validação do token 

      isvalidtionToken(token:string){
            try {
                 this.checkToken(token)

              return true;
              
            } catch (e) {

                return false;
            }
          }


        async login(email:string, senha:string){
            // logando o user

       const user =  await this.usersRepository.findOneBy({   
                    // vai procurar a pessoa que o o email cadastrado no banco e a senha correta , se der certo vai autenticar o usuario
                    email,
                    senha                  
            });
 
            // se não tiver o usuario passado no email e senha 
                if (!user) {
                        throw new UnauthorizedException('Email e/ou senha incorretos')
                }
                // se o usuario passou do erro a cima é que deu certo o login 
                console.log(user);
                  
                return  this.createToken(user);
        }

       
        async recuperacaoDeSenha(email:string){
            // e o mesmo processo do que o login só mudar trocando o where e alguns detalhes 

            
      const user =  await this.usersRepository.findOneBy({
            
            
                // vai procurar a pessoa que o o email cadastrado no banco  , se der certo vai autenticar o usuario
                
                email   
        });
        // se não tiver o usuario passado no email 
            if (!user) {
                    throw new UnauthorizedException('Email está incorreto ')
            }
            // tem como colocar um limite de validação de email para não dar chance de hackers 
            // so precisar retornar o email


            // TO DO : enviar email para o usuario
          
          const token =  this.jwtService.sign({
             id: user.id,
             
          } ,{
      
              expiresIn: "7 days",
              subject:String(user.id),
              issuer: 'recuperacaoDeSenha' , 
              audience:'users' ,
          });

      
        
          
            return true


    }


        


         async reset(senha:string, token:string){
      try {
            const data: any =  this.jwtService.verify(token , {
              issuer: 'recuperacaoDeSenha' , 
              audience:'users' ,

          });

          if(isNaN(Number(data.id))){
            throw new BadRequestException('Token inválido')
          
          }
           
             await this.usersRepository.update(Number(data.id),{
                 senha
               
            }) ;

            const  user = await this.userService.show(Number(data.id));
        

            return await this.createToken(user);

            
          } catch (e) {
              throw new BadRequestException(e);
          }

     
        }   

         // passar essas informção para o garçom 



         async register( dados:AuthRegisterDto){
          //pegando o dto para simplificar 
          const user = await this.userService.create(dados);
          console.log(user);
          return await this.createToken(user);
          

         }


         }


