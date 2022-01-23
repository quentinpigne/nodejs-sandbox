import { Request, Response, Router } from 'express';

export default () => {
  const router: Router = Router();

  router
    .route('/')
    .get((req: Request, res: Response) => {
      res.send('Hello World!');
    })
    .post((req: Request, res: Response) => {
      res.send(req.body);
    });

  return router;
};
