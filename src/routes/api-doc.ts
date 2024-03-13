import express from 'express';
import swaggerUi from 'swagger-ui-express';
import openapiSpecification from '../config/swagger';

export default class ApiDoc {
    public routes() {
        const router = express.Router();

        router.get('/', swaggerUi.setup(openapiSpecification));

        return router;
    }
}