import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FitTrackr',
            version: '1.0.0',
            description: "A sample API for FitTrackr app"
        }
    },
    apis: ['../routes/index*.ts']
};

const openapiSpecification = swaggerJsdoc(options);

export default openapiSpecification;