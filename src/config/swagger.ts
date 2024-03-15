import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FitTrackr',
            version: '1.0.0',
            description: "REST API app made with Express."
        },
        servers: [
            {
                url: 'http://localhost:8000',
                description: 'Development server',
            },
        ]
    },
    apis: ['./src/routes/*.ts']
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;