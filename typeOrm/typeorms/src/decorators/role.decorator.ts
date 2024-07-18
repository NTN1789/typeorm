import { Role } from "src/enums/role.enum";
import {SetMetadata} from "@nestjs/common"

export const Roles_Key =  "role"
export const  Roles = (...role :Role[]) => SetMetadata('role', role)
                                                                    // role é como uma chave para entrar em algo 
                                                                    // role é um array de Role

