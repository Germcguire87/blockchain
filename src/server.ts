'use strict';

import * as express from 'express';
import { getMineRouteHandler } from './actions/get-mine';
import { postNewTransactionRouteHandler } from './actions/post-new-transaction';
import { getChainRouteHandler } from './actions/get-chain';

// Constant
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

//TODO move these routes to an init file.
//and make these routes more RESTful 
app.get('/', (req: any, res: any) => {
  res.send('Hello World');
});

app.get('/mine', (req: any, res: any) => { 
  return getMineRouteHandler(req, Response)  
});

app.post('/transaction/new', (req: any, res: any) => {
  return postNewTransactionRouteHandler(req, Response)
});

app.get('/chain', (req: any, res: any) => { 
  return getChainRouteHandler(req, Response)  
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);