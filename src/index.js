import express from 'express';
import routes from './routes';
import http from 'http';
import cors from 'cors';
import { setupWebsocket } from './websocket';

import './database';

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(3333);
