import {Selector} from 'react-redux';
import {RootState} from '../../../app/store';
import slice from './slice';

export const getIsLoading: Selector<RootState, boolean> = (state) => (
    state[slice.name].isLoading
);

export const getState: Selector<RootState, 'success' | 'error'> = (state) => (
    state[slice.name].state
);
