import cors from 'cors';
import express from 'express';

import { delayMiddleware } from './middleware/delay.middleware';
import { errorHandler } from './middleware/error.middleware';
import routes from './routes';

export const createServer = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // Adds sleep of 5 seconds when performing each of the actions
    if (process.env.NODE_ENV !== 'test') {
        app.use(delayMiddleware(5000));
    }

    app.use(routes);

    app.use(errorHandler);

    return app;
};
