import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/Create.user.dto";
import { UpdatePutUserDto } from "./dto/Update-Put.user.dto" ;
import { UpdatePatchUserDto } from "./dto/Update-Patch.user.dto"
import {Repository} from "typeorm"
import { UserEntity } from "./entity/user.entinty";
import { InjectRepository } from "@nestjs/typeorm";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Injectable()
export class  UserService{

        //   precisar do constructor para criar
        constructor(
                  @InjectRepository(UserEntity)
                private readonly usersRepository:Repository<UserEntity>
                
                
                
                ){}

      async  create( {email,nome,senha}:CreateUserDto){
         
        // verificação se o email já está sendo usado 

        if (
                await this.usersRepository.exist({
                 
                    where:{
                      email,
                      nome

                    }
                    
                
                })
              )  {
                throw new BadRequestException('Este e-mail já está sendo usado.');
               
        } 
              const user = this.usersRepository.create({
                        email,
                        nome,
                        senha
                })
                
              return  this.usersRepository.save(user);
              
               // leitura de todos os usuarios o READ 
        }

        // para fazer leitura , são o metodos que tem o find no inicio , isso e padrão do prisma 
         async listUsuario(){
                  return await this.usersRepository.find({

                  }); 
       
                }

        // chamar um usuario só pelo id e chave da tabela 

        async show(id:number){
                await this.exists(id);

        return await this.usersRepository.findOneBy({     
                                id       
                     });     
                }

        async update(id:number , {email,nome,senha,birthAt, role}:UpdatePutUserDto){
              // verificando se o usuario existe para não ocorrer error de criar dois usuario
            await this.exists(id);
              
                if(!birthAt) {
                        birthAt = null // se não tiver data e vazio ou nular
                }
              await  this.usersRepository.update(id,{
                     // tem que ter dois dados no update 
                                email,
                                nome,
                                senha ,
                                birthAt: birthAt ? new Date(birthAt) : null, 
                                role        
              });
              return this.show(id);
        }

        async updateAndPatch(id:number , {email,nome,senha,birthAt,role}:UpdatePatchUserDto){
        
             await this.exists(id);
                const data: any = {};

                if(birthAt) {
                  data.birthAt = new Date(birthAt)
                }
                

                if (email) {
                             data.email = email;   
                }


                
                if (nome) {
                        data.nome = nome;   
           }


           
           if (senha) {
                data.senha = senha;   
   }

   if (role) {
        data.role = role;   
}
            await  this.usersRepository.update( id,{
                     
                                 email,
                                  nome,
                                  senha,
                                  birthAt,
                                  role      
                });
                return this.show(id);
        }
     async delete (id:number){
        await this.exists(id);
        // se  o retorno disso não for nada , não encontrou nada  e
        // vai retornar um excessão  de que não achou o usuario
        

 await this.usersRepository.delete(id);
     
        return true;

}     

     
     async exists(id: number) {


     

        if (!(await  this.usersRepository.exist({
            where: {
                id,
            },
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe.`);
        
          }
   
   
        }
     
  


}