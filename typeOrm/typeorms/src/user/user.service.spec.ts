import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { userRepositoryMock } from "../testing/User.Repository.mock";



describe(' UserService', () => {

        let userService:UserService;

    beforeEach( async () => {
 
            const module:TestingModule =  await Test.createTestingModule({
               // o userService ele um provider  está no user.module é sempre e um provider 
               providers:[
                UserService,
                userRepositoryMock


               
        
        ] 
            }).compile(); 
            userService = module.get<UserService>(UserService);
        });


        test("validar a definicao", () => {
                expect(userService).toBeDefined();
        })


});