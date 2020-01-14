import { Router } from 'express';

const routes = new Router();

routes.post('/users', (req, res) => {
  return res.json({ message: 'Hello World' });
});

export default routes;
