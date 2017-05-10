import * as d3 from 'd3';
import { Dispatch } from 'redux';

import { dataReceived } from '../';
import { dataRequested } from '../';
import { baseurl } from '../../config';
import { GenericAction } from '../../types';
import { DatabaseRecord } from '../../types';

import 'whatwg-fetch';

export const d3DataRequestedThunk = (dataset: string) => {
    return (dispatch: Dispatch<GenericAction>) => {
        const handleTheStatus = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error when trying to retrieve the data. ' +
                    'status text: \"' + response.statusText + '".');
            }
        };

        const handleTheData = () => {
            const d3JSONRequest = d3.json(url, (error: any, data: DatabaseRecord[]) => {
                if (error) {
                    throw error;
                }
                dispatch(dataReceived(data));
            });

            d3JSONRequest.get();
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
