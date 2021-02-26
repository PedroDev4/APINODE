import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';


class NpsController {

    /**
     * Notas de 0 a 6 -> Detratores
     * Notas de 7 - 8 -> Passivos
     * Notas de 9 - 10 -> Promotores
     * 
     * Calculo NPS -> 
     */

    async execute(request: Request, response: Response) {
    
        const { survey_id } = request.params;
        
        const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers =  await surveyUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        })

        const decractor = surveysUsers.filter((survey) => survey.value >= 0 && survey.value <= 6).length;
        
        const promoters = surveysUsers.filter((survey) => survey.value >= 9 && survey.value <= 10).length;

        const passives = surveysUsers.filter((survey) => survey.value >= 7 && survey.value <= 8).length;

        const totalAnswers = surveysUsers.length;

        const calculate = Number((((promoters - decractor) / totalAnswers) * 100).toFixed(2));

        return response.json({
            decractor,
            promoters,
            passives,
            totalAnswers,
            nps: calculate,
        })
    }  

}

export { NpsController }; 