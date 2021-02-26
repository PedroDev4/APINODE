import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import SendMailService from '../services/SendMailService';
import { resolve } from 'path';
import { AppError } from '../errors/AppError';


class SendMailController {
    async execute(request: Request, response: Response) {

        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveyusersRepository = getCustomRepository(SurveysUsersRepository);

        const user = await usersRepository.findOne({email});

        if(!user) {
            throw new  AppError("User does not exists!");
        }

        const survey = await surveysRepository.findOne({id: survey_id});

        if(!survey) {
            throw new AppError("Survey does not exists!");
        }

        

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        // SELECT * FROM survey_user where id recebido = id; Se ja tem relação
        const surveyUserAlreadyExists = await surveyusersRepository.findOne({
            where: { user_id: user.id , value: null},
            relations: ["user", "survey"],
        });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL,
        }   

        // Se existe manda email para Surveyuser ja existente
        if(surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        // Criando novo survey_user na tabela surveyUser
        const surveyUser = surveyusersRepository.create({
            user_id: user.id,
            survey_id,
        });

        // Salvando na tabela surveys_users
        await surveyusersRepository.save(surveyUser);

        variables.id = surveyUser.id;

        //Enviar email para usuário chamando o método execute do "SendMailService.ts"
        //Passando os parametros 
        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.json(surveyUser);

    } 
}

export { SendMailController };