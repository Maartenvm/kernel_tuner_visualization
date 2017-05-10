import { DATA_RECEIVED } from '../actions';
import { DATA_REQUESTED } from '../actions';

import { DatabaseRecord } from '../types';
import { GenericAction } from '../types';

import * as crossfilter from 'crossfilter';

const initstate = {
    data:  [{
        between_method:         -1,
        block_size_x:           -1,
        tile_size:              -1,
        time:                   -1,
        use_method:             -1,
        use_precomputed_slopes: -1
    }],
    ndx: {}
};

export const dataReducer = (state: any  = initstate, action: GenericAction) => {
    if (action.type === DATA_RECEIVED) {
        const ndx = crossfilter(action.payload.nodes);
        Object.assign({}, state, { data: action.payload.nodes });
        Object.assign({}, state, { ndx: ndx });
        return state;
    } else if (action.type === DATA_REQUESTED) {
        return state;
    } else {
        return state;
    }
};
