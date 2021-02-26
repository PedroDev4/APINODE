import { Connection, createConnection, getConnectionOptions } from "typeorm";


/* Criando uma função assincrona que vai fazer uma Promise 
 retornando o método CreateConnection(); */
export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions(); // Salvando as Config do DB normal na constante

    return createConnection(
        Object.assign(defaultOptions, {                                    
            database: process.env.NODE_ENV === 'test' // SE 
            ? "./src/database/database.test.sqlite" //ENTÃO
            : defaultOptions.database // SENÃO
        })
    ); 
}