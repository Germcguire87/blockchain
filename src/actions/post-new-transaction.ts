import * as Promise from 'bluebird';
import { ITransaction } from '../models';
import { Blockchain } from '../blockchain';

export function postNewTransactionRouteHandler(req: any, res: any, blockChain: Blockchain): void {
    let transaction: ITransaction = req.body;

    //TODO validate the transaction
    // check for sender, recipient, and amount

    let index = blockChain.createNewTransaction(transaction.sender, transaction.recipient, transaction.amount);
    //TODO add response
    // response = {'message': f'Transaction will be added to Block {index}'}
    res.send()
    return;
}