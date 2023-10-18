import { getRepositoryToken } from "@nestjs/typeorm"
import { UserEntity } from "../user/entity/user.entinty"
import { userEntityList } from "./User-entity-list.mock"


export const userRepositoryMock = {
 
        provide: getRepositoryToken(UserEntity),

        useValue:{
        exit: jest.fn().mockResolvedValue(true),
     create:jest.fn(),
        save:jest.fn().mockResolvedValue(userEntityList[0]), // vai resolver o  problema do banco de dados fake
        find:jest.fn().mockResolvedValue(userEntityList),
        findOneBy: jest.fn().mockResolvedValue(userEntityList[0]), 
        update:jest.fn(),
        delete: jest.fn(),

    


},
}