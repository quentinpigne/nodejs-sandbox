import nconf from 'nconf';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import logger from '../../lib/logger';
import routes from '../../app/routes';

interface Error {
  name: string;
  message: string;
  status: number;
}

export default function(callback: (err?: Error | null) => void) {
  const app: express.Application = express();
  const port: number = nconf.get("NODE_PORT");

  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(nconf.get("api:prefix"), routes());

  // Catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    next({ message: 'Not Found', status: 404 });
  });

  // Error handlers
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });

  app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    });
  });

  app.listen(port, () => {
    logger.info(`[SERVER] Listening on port ${port}`);
    callback();
  }).on('error', function (error: Error & { code: string }) {
    if(error.code === 'EADDRINUSE') {
        logger.error(`[SERVER] Port ${port} is busy`);
    }
    callback(error);
  });
}
