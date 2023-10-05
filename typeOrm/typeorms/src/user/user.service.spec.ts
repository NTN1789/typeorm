import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entinty";

describe(' UserService', () => {

        let userService:UserService;

    beforeEach( async () => {
 
            const module:TestingModule =  await Test.createTestingModule({
               // o userService ele um provider  está no user.module é sempre e um provider 
               providers:[
                UserService,
                {
                     provide: getRepositoryToken(UserEntity),
                        useValue:{
                            exit: jest.fn(),
                         create:jest.fn(),
                            save:jest.fn(),
                            find:jest.fn(),
                            findOneBy: jest.fn(), 
                            update:jest.fn(),
                            delete: jest.fn(),

                        } 
                }

               
        
        ] 
            }).compile(); 
            userService = module.get<UserService>(UserService);
        });


        test("validar a definicao", () => {
                expect(userService).toBeDefined();
        })


});