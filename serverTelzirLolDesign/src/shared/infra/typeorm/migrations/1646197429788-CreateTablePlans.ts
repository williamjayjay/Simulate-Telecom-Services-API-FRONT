import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablePlans1646197429788 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "plans",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "namePlan",
                        type: "varchar(100)"
                    },

                    {
                        name: "numberPlan",
                        type: "integer"
                    },

                ]

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("plans")

    }

}
