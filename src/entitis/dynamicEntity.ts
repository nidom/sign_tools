import { EntitySchema } from "typeorm"

export function createDynamicEntity2(tableName: string) {
    return new EntitySchema({
        name: tableName,
        columns: {
            
            // id: {
            //     primary: true,
            //     type: "int",
            //     generated: true,
            //     name: "id",
            //     comment: "主键id"
            // },
            // createdAt: {
            //     type: "timestamp",
            //     nullable: false,
            //     name: "created_at",
            //     comment: "创建时间",
            //     createDate: true
            // },
            // updatedAt: {
            //     type: "timestamp",
            //     nullable: false,
            //     name: "updated_at",
            //     comment: "更新时间",
            //     updateDate: true
            // }

           note: {
                type: "varchar",
                nullable: false,
                name: "note",
                comment: "更新时间",
                // updateDate: true
            }

      
            // ... 其他列
        }
    })
}


