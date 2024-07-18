import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entity/user.entinty";

export const userEntityList:UserEntity[] = [{
    nome:'natan almeida',
    email:'natanalmeida040@gmail.com',
    birthAt: new Date('2000-01-01'),
    id:1,
    senha:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Im5hdGFuIiwiZW1haWwiOiJuYXRhbmFsbWVpZGEwNDBAZ21haWwuY29tIiwiaWF0IjoxNjk2OTQ0MjQ4LCJleHAiOjE2OTc1NDkwNDgsImF1ZCI6InVzZXJzIiwiaXNzIjoibG9naW4iLCJzdWIiOiIxIn0.QAycKTfVjjxMX3Sh7FS8EH1lCJGxYb0i_4PFFDXoVRA',       
    role:Role.admin,
    createAt: new Date(),
    updateAt: new Date()
},{
   nome:'jose',
   email:'jose@gmail.com',
   birthAt: new Date('2000-01-01'),
   id:2,
   senha:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Im5hdGFuIiwiZW1haWwiOiJuYXRhbmFsbWVpZGEwNDBAZ21haWwuY29tIiwiaWF0IjoxNjk2OTQ0MjQ4LCJleHAiOjE2OTc1NDkwNDgsImF1ZCI6InVzZXJzIiwiaXNzIjoibG9naW4iLCJzdWIiOiIxIn0.QAycKTfVjjxMX3Sh7FS8EH1lCJGxYb0i_4PFFDXoVRA',       
   role:Role.admin,
   createAt: new Date(),
   updateAt: new Date()
},{
   nome:'pedro',
   email:'pedro@gmail.com',
   birthAt: new Date('2000-01-01'),
   id:3,
   senha:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6Im5hdGFuIiwiZW1haWwiOiJuYXRhbmFsbWVpZGEwNDBAZ21haWwuY29tIiwiaWF0IjoxNjk2OTQ0MjQ4LCJleHAiOjE2OTc1NDkwNDgsImF1ZCI6InVzZXJzIiwiaXNzIjoibG9naW4iLCJzdWIiOiIxIn0.QAycKTfVjjxMX3Sh7FS8EH1lCJGxYb0i_4PFFDXoVRA',       
   role:Role.admin,
   createAt: new Date(),
   updateAt: new Date()

}]

