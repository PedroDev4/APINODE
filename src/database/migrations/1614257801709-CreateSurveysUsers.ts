import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614257801709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "surveys_users",
                columns: [

                    {   
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },

                    {
                        name: "user_id",
                        type: "uuid",
                    },

                    {
                        name: "survey_id",
                        type: "uuid",
                    },

                    {
                        name: "value",
                        type: "number",
                        isNullable: true
                    },

                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }

                ],

                foreignKeys: [

                    {
                        name: "FKUser", // Nome da de Foreing Key sendo criada
                        referencedTableName: "users", // Tabela referencada
                        referencedColumnNames: ["id"], // Campo da tabela refenciada
                        columnNames: ["user_id"], // campo da tabela atual q vai receber a foreign key
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },

                    {
                        name: "FKSurvey", // Nome da de Foreing Key sendo criada
                        referencedTableName: "surveys", // Tabela referencada
                        referencedColumnNames: ["id"], // Campo da tabela refenciada
                        columnNames: ["survey_id"], // campo da tabela atual q vai receber a foreign key
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    
                ]

            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('surveys_users');
    }

}
