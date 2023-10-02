import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/Create.user.dto";
import { UpdatePutUserDto } from "./dto/Update-Put.user.dto" ;
import { UpdatePatchUserDto } from "./dto/Update-Patch.user.dto"
import {Repository} from "typeorm"
import { UserEntity } from "./entity/user.entinty";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class  UserService{

        //   precisar do constructor para criar
        constructor(
                  @InjectRepository(UserEntity)
                private readonly usersRepository:Repository<UserEntity>
                
                
                
                ){}

      async  create( {email,nome,senha}:CreateUserDto){
         
        // e igual no prisma 
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
                   //     where: {
                     //           email : {
                               //         contains: "@gmail.com" // vai listar todos que tem gmail 
                       //         }  
                       // }
                   }); 
       
       
       
                }


        // chamar um usuario só pelo id e chave da tabela 

        async show(id:number){

        return await this.usersRepository.findOneBy({
                      
                                id
                         
                         
                     });     
      

      
      
                }
// cuidado com o updateMany ele alterar todos os registros , e o update ele altera somente um registro

        async update(id:number , {email,nome,senha,birthAt, role}:UpdatePutUserDto){
              // verificando se o usuario existe para não ocorrer error de criar dois usuario
            
              
                if(!birthAt) {
                        birthAt = null // se não tiver data e vazio ou nular
                }
        
             return await  this.usersRepository.update(id,{
                     // tem que ter dois dados no update 
                                email,
                                nome,
                                senha ,
                                birthAt: birthAt ? new Date(birthAt) : null, 
                                role        
                      
          
              });

        
        
        }





        async updateAndPatch(id:number , {email,nome,senha,birthAt,role}:UpdatePatchUserDto){
        
             
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

              return await  this.usersRepository.update( id,{
                     
                                 email,
                                  nome,
                                  senha,
                                  birthAt,
                                  role
                                              
                
                });
 
        }

                // metodo delete 
                // no delete tem dois metódos 
                // no delete é uma chave única 
                // no deleteMany é qualque campo se especificar 
     async delete (id:number){
        await this.exists(id);
        // se  o retorno disso não for nada , não encontrou nada  e
        // vai retornar um excessão  de que não achou o usuario
        

        return await this.usersRepository.delete({id})
     


}     

     
     async exists(id: number) {


     

        if (!(await  this.usersRepository.exist({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`O usuário ${id} não existe.`);
        
          }
   
   
        }
     
  


}