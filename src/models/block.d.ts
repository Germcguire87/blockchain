import {ITransaction} from '.';

export interface IBlock {
    index: number;
    timestamp: number;
    transactions: Array<ITransaction>;
    proofOfWork: number;
    previous_hash: string;
}
