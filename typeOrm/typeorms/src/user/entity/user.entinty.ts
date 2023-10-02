import { Role } from "src/enums/role.enum";
import { Entity,PrimaryGeneratedColumn ,Column, CreateDateColumn,UpdateDateColumn} from "typeorm";
@Entity({
    name:'users'
    //pode usar schemas tbm
})
export class UserEntity {

    @PrimaryGeneratedColumn({
        unsigned:true,

    })
    id:number;

    @Column({
        length:63
    })
    nome:string;

    @Column({
        length:123,
        unique:true // email e unico 
    })
    email:string;

    @Column()
    senha:string;

    @Column({
        type:'date',
        nullable: true,
    })
    birthAt:Date;

    @CreateDateColumn()
    createAt:string;

    @UpdateDateColumn()
    updateAt:string;

 
    @Column({
        default : Role.user
    })
    role:number;

}