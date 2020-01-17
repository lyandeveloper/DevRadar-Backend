import { Router } from 'express';

import DevController from './app/controllers/DevController';
import SearchController from './app/controllers/SearchController';

const routes = new Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:_id', DevController.update);

routes.get('/search', SearchController.index);

export default routes;
