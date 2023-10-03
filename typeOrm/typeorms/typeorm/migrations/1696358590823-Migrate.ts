import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Migrate1696358590823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
   
        await queryRunner.createTable(new Table({
            name: "users",  // nome da tabela
            columns: [{
                // colunas da tabela
                    name:"id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",   // incrementando o número
                    unsigned:true // não aceitar números negativos 
            },{
                    //coluna nome e definindo como tem que ser 
                    name:"name",
                    type: "varchar",
                    length: "63"
            },{
                    name:"email",
                    type: "varchar",
                    length:"127",
                    isUnique: true
            },{

                name:"password" ,
                type: "varchar",
                length:"127"
            },{
                name:"birthAt",
                type: "date",
                isNullable: true //colocando que pode ser nulo
                
            },{
                name:"role"  ,
                type: "int",
                default: 1
            },{
                  name:"createdAt",
                  type: "timestamp",  
                  default:'CURRENT_TIMESTAMP()' 
        } ,{
            name:"updatedAt",
            type: "timestamp",  
            default:'CURRENT_TIMESTAMP()' 

        }]    
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    
    
    }

}
