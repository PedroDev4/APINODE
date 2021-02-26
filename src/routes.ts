import { Router } from "express";
import { UserController } from './controllers/UserController'; 
import { SurveysController } from './controllers/SurveysController'; 
import { SendMailController } from "./controllers/SendMailController";
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController';

const router = Router();

const userController = new UserController(); 
const surveyController = new SurveysController();
const sendmailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

// Chamando o método Create da minha classe UsersController;
router.post("/users", userController.create); 
// Chamando o método Create da minha classe SurveysController;
router.post("/surveys", surveyController.create);   

//Chamando o metodo Show da minha classe SurveysController
router.get("/surveys", surveyController.show);

router.post("/sendMail", sendmailController.execute);

router.get("/answers/:value", answerController.excute);

router.get("/nps/:survey_id", npsController.execute);

export { router }; 