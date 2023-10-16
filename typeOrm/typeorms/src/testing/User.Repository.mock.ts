import { getRepositoryToken } from "@nestjs/typeorm"
import { UserEntity } from "../user/entity/user.entinty"


export const userRepositoryMock = {
 
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