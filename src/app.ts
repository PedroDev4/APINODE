import express, { NextFunction, response } from "express";
import 'express-async-errors';
import 'reflect-metadata';
import createConnection from "./database"; 
import { AppError } from "./errors/AppError";
import { router } from "./routes";
import { Request, Response } from 'express';

createConnection(); //Chamando o método de createConnection do Index.ts from database
const app = express();

app.use(express.json()); // Informando ao EXPRESS que iremos trabalhar com o JSON
app.use(router);

app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {

        if(err instanceof AppError){
            return response.status(err.statusCode).json({
                message: err.message,
            })
        }

        return response.status(500).json({
            status: "Error",
            message: `Internal server error ${err.message}`,
        });
    }

);

export { app }; 