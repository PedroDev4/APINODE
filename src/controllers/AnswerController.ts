import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {

    // https://localhost:3333/answers/10?u=641aac55-ec8a-429d-8969-9dafd8ed5d92
    /* 
        Route Params -> Parâmentros que compoe a rota 

        query Params -> Usados para Busca, paginação,, não obrigatórios
        usados após o "?"

        estrutura: chave=valor
    */

    async excute(request: Request, response: Response) {

        const { value }  = request.params; // Pegando valores da requisição params
        const { u } = request.query;// Pegando valores da requisição query

        const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);

        // Verificando se o QUERY PARAM recebido é valido
        const surveyUser = await surveyUsersRepository.findOne({
            id: String(u) // Fornçando a variavel U a ser uma String
        })

        if(!surveyUser) {
            throw new AppError("Survey User does not exists!");
        } 

        surveyUser.value = Number(value); // Sobrescrevendo o value recebido como param em number

        await surveyUsersRepository.save(surveyUser);

        return response.json(surveyUser);


    }

}   

export { AnswerController };