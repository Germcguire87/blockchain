'use strict';

import * as express from 'express';
import * as uuid from 'node-uuid';
import { getMineRouteHandler } from './actions/get-mine';
import { postNewTransactionRouteHandler } from './actions/post-new-transaction';
import { getChainRouteHandler } from './actions/get-chain';
import { Blockchain } from './blockchain';

// Constant
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

//create an identifier for this node
let nodeIdentifier = uuid.v4();

//instatiate the chain
let blockchain = new Blockchain();

//TODO move these routes to an init file.
//and make these routes more RESTful 

//TODO
//read about hashes in relation to blockchain POW

//add tslint gulp task

//keep up with git topics

app.get('/', (req: any, res: any) => {
  res.send('Hello World');
});

app.get('/mine', (req: any, res: any) => {
  return getMineRouteHandler(req, res, blockchain, nodeIdentifier);
});

app.post('/transaction/new', (req: any, res: any) => {
  return postNewTransactionRouteHandler(req, res, blockchain);
});

app.get('/chain', (req: any, res: any) => {
  return getChainRouteHandler(req, res);
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);