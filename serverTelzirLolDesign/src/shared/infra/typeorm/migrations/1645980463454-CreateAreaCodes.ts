import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAreaCodes1645980463454 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "areaCodes",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "origin",
                        type: "varchar(3)"
                    },
                    {
                        name: "destiny",
                        type: "varchar(3)"
                    },
                    {
                        name: "valPerMinute",
                        type: "varchar(100)"
                    }

                ]

            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("areaCodes")
    }

}
