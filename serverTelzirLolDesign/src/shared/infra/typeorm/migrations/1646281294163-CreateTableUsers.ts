import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1646281294163 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },

                    {
                        name: "userOrigin",
                        type: "varchar(3)"
                    },
                    {
                        name: "userDestiny",
                        type: "varchar(3)"
                    },
                    {
                        name: "userValPerMinute",
                        type: "varchar(100)"
                    },
                    {
                        name: "userNamePlan",
                        type: "varchar(100)"
                    },
                    {
                        name: "time",
                        type: "integer"
                    },
                    {
                        name: "noPlan",
                        type: "varchar"
                    },
                    {
                        name: "withPlan",
                        type: "varchar"
                    }

                ]

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")

    }

}
