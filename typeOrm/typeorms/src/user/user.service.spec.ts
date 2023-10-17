import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { userRepositoryMock } from "../testing/User.Repository.mock";
import { CreateUserDto } from "./dto/Create.user.dto";
import { Role } from "../enums/role.enum";
import { userEntityList } from "../testing/User-entity-list.mock";



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
        });

        describe("Create", () => {
                test(' create' , async ()=> {
                        const data:CreateUserDto ={
                             birthAt:'200-01-01',
                              email:'natanalmeida040@gmail.com',
                              nome:'natan almeida',
                               senha:'Banjo2020@',
                               role:Role.user 
                        } 
                    const result = await  userService.create(data);
                
                        expect(result).toEqual(userEntityList[0])
                
                
                });
        });
     


});