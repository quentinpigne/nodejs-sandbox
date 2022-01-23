import { Router } from 'express';
import { paramCase } from 'change-case';

import test from './test';

const routes: { [key: string]: () => Router } = {
  test,
}

export default () => {
  const router: Router = Router();

  // Initialize all routes
  Object.keys(routes).forEach((routeName: string) => {
    // Add route to the speficied route name
    router.use('/' + paramCase(routeName), routes[routeName]());
  });

  return router;
}
