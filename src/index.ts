import express from 'express';
import http from 'http';
import dotenv from 'dotenv'; 
import expressConfig from './config/express';
import errorHandlingMiddleware from './middleware/errorHandlingMiddleware';
import routes from './routes';

// Config
dotenv.config();

const app = express();
const server = http.createServer(app);

expressConfig(app);

// Routes
routes(app);

// Middleware
app.use(errorHandlingMiddleware);

server.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`);
})