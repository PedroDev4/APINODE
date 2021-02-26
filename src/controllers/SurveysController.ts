import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository' 

class SurveysController {
    async create(request: Request, response: Response) {

        const { title, description } = request.body;

        // Definindo o repositiorio da entidade Survey // Indicando para usar nossa classe de Repos
        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title,
            description,
        });

        await surveysRepository.save(survey);

        return response.status(201).json(survey);

    }


    async show(requst: Request, response: Response) {

        const surveysRepository = getCustomRepository(SurveysRepository);

        // Variavel aonde vai receber o SELECT do repositorio
        const all = await surveysRepository.find();

        return response.json(all)

    }  
} 

export { SurveysController }; 