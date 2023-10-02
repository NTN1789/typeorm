import { Body, Delete, Get, Patch, Post, Put,Controller ,UseInterceptors,UseGuards} from "@nestjs/common";
import { ParamId } from "src/decorators/param-id.decorator";
import { UserService } from "./user.service";
import { UpdatePutUserDto } from "./dto/Update-Put.user.dto";
import { UpdatePatchUserDto } from "./dto/Update-Patch.user.dto";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RoleGuard } from "src/guardParaUser/role.guard";
import { LogInterceptor } from "src/interceptions/log.interceptor";

@Roles(Role.admin)
@UseGuards(AuthGuard,RoleGuard)   // todas as rotas vai ter o guard que eu criei 
@UseInterceptors(LogInterceptor) // todas as rotas será interceptada
@Controller('users')
export class UserController{

    constructor (private readonly userService:UserService){

    }

    @Post()
    async create(@Body() dados){

        return this.userService.create(dados);
    }


    @Get()
    async list(){
            return await this.userService.listUsuario();
    }
    // caso queiram um usuario 
    

    @Get(':id')
    async readOne( @ParamId() id:number ){
        console.log({id});
        return await this.userService.show(id);
    
}

@Put(":id")
async update(@Body()  dados:UpdatePutUserDto,@ParamId() id:number){
    return await this.userService.update(id,dados);

}


@Patch(":id")
async patch(@Body()  dados:UpdatePatchUserDto , @ParamId() id:number ){
    return  await this.userService.updateAndPatch(id,dados);
}


@Delete(":id")
async delete(@ParamId() id:number){
        return await this.userService.delete(id) 
    }














}