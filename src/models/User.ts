import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('users') // Notation do TypeORM + Nome que demos a tabela
class User {

    @PrimaryColumn() // Definindo o atributo da classe como chave primária;
    readonly id: string;

    @Column() // O atributo é apenas uma coluna/campo comum na tabela
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date

    constructor() {
        // Se esse ID não existir então ID VAI TER VALOR DE UUID;
        if(!this.id) {
            this.id = uuid();
        } 
    }
} 

export { User };
