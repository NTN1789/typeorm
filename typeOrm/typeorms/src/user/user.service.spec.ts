import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { userRepositoryMock } from "../testing/User.Repository.mock";
import { userEntityList } from "../testing/User-entity-list.mock";
import { CreateUser} from "../testing/User.Create.dto";

import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entinty";
import { getRepositoryToken } from "@nestjs/typeorm";



describe(' UserService', () => {

        let userService:UserService;
        let usersRepository:Repository<UserEntity>

    beforeEach( async () => {
 
            const module:TestingModule =  await Test.createTestingModule({
               // o userService ele um provider  está no user.module é sempre e um provider 
               providers:[
                UserService,
                userRepositoryMock


               
        
        ] 
            }).compile(); 
            userService = module.get<UserService>(UserService);
            usersRepository = module.get(getRepositoryToken(UserEntity))
    
        });


        test("validar a definicao", () => {
                expect(userService).toBeDefined();
                expect(usersRepository).toBeDefined();
          });

        describe("Create", () => {
                test('method Create' , async ()=> {
                       
                 jest.spyOn(usersRepository,'exist').mockResolvedValueOnce(false) 
                   
                   
                        const result = await  userService.create(CreateUser);
                
                        expect(result).toEqual(userEntityList[0]);
                   
                
                });
        });

        describe ("Read", () => {
                test('method list' , async ()=> {
                       
                    const result = await  userService.listUsuario();
                        expect(result).toEqual(userEntityList);
                })

                test('method show' , async ()=> {
                        jest.spyOn(usersRepository,'exist').mockResolvedValueOnce(false) 
                        const result = await  userService.show(1);
                        expect(result).toEqual(userEntityList[0]);
                
                })

                })



});