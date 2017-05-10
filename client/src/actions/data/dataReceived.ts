import { DatabaseRecord } from '../../types';
import { DATA_RECEIVED } from '../authorized-actions';

export const dataReceived = (nodes: DatabaseRecord[]) => {
    return {
        payload: { nodes },
        type: DATA_RECEIVED
    };
};
