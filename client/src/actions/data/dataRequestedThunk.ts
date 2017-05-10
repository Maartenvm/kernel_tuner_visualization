import { Dispatch } from 'redux';

import { dataReceived } from '../';
import { dataRequested } from '../';
import { baseurl } from '../../config';
import { GenericAction } from '../../types';
import { DatabaseRecord } from '../../types';

import 'whatwg-fetch';

export const dataRequestedThunk = (dataset: string) => {
    return (dispatch: Dispatch<GenericAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when trying to retrieve the data. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleTheData = (dbrecords: any) => {
            const convert = (dbrecord: DatabaseRecord) => {
                return {
                    between_method:         dbrecord.between_method,
                    block_size_x:           dbrecord.block_size_x,
                    tile_size:              dbrecord.tile_size,
                    time:                   dbrecord.time,
                    use_method:             dbrecord.use_method,
                    use_precomputed_slopes: dbrecord.use_precomputed_slopes
                };
            };

            const nodes = dbrecords.map(convert);
            dispatch(dataReceived(nodes));
        };

        const handleAnyErrors = (err: Error) => {
            console.error('Errors occured. ' + err.message + err.stack);

            const fauxNode = {
                    between_method:         -1,
                    block_size_x:           -1,
                    tile_size:              -1,
                    time:                   -1,
                    use_method:             -1,
                    use_precomputed_slopes: -1
                };
            dispatch(dataReceived([fauxNode]));
        };

        dispatch(dataRequested());

        const url: string = baseurl + '/' + dataset;

        fetch(url, {method: 'get'})
                .then(handleTheStatus)
                .then(handleTheData)
                .catch(handleAnyErrors);
    };
};
