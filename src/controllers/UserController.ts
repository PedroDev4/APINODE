import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup'; 
import { AppError } from '../errors/AppError';

class UserController{
    async create(request: Request, response: Response) {
        const { name, email } = request.body; // Recebendo Email e name do Corpo da requisição;

        //  Montando o shape da validação
        const schema = yup.object().shape({
            name: yup.string().required(),
            email:yup.string().email().required(),
        });

        // Testando se a validação está correta no corpo da requisição     
        try{
            await schema.validate(request.body, { abortEarly: false });
        }catch(err){
            throw new AppError("User Already exists!");
        }
        
        // Definindo o repositiorio da entidade Usuario // Indicando para usar nossa classe de Repos.
        const userRepository = getCustomRepository(UsersRepository);

        /* SELECT * FROM USERS WHERE EMAIL = "EMAIL" */
        const userAlreadyExists = await userRepository.findOne({
            email, // Procurar usuario por email
        });

        if(userAlreadyExists) {
            throw new AppError("User Already exists!");
        } 

        // metodo Create na constante "user"
        const user = userRepository.create({    
            name,email
        })

        // 
        await userRepository.save(user);

        // Retornando usuário que foi salvo
        return response.status(201).json(user);
    } 

} 

export { UserController };
