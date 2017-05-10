import { dataReducer } from './';

import { GenericAction } from '../types';

const overallInitstate: any = {
    data: {}
};

/* Function needed to give only _part_ of the state to the individual trees,
    but the _whole_ state to the queryReducer
*/
export const combinedReducer = (state: any = overallInitstate, action: GenericAction) => {
    console.log(new Date().toISOString().slice(11, 19), action.type); //tslint:disable-line

    const result: any = {};

    // These reducers need the whole state
    result.data = dataReducer(state.data, action);
    return result;
};
