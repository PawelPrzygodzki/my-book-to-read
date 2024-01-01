import {Selector} from 'react-redux';
import {RootState} from '../../../app/store';
import slice from './slice';

export const getIsLoading: Selector<RootState, boolean> = (state) => (
    state[slice.name].isLoading
);

export const getData: Selector<RootState, {
    id: number,
    name: string,
    books: { title: string, authorName: string, id: number }[]
}> = (state) => (
    state[slice.name].data
);

