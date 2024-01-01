import {createSlice} from '@reduxjs/toolkit';

type INITIAL_STATE_TYPE = {
    isLoading: boolean,
    data: {
        id: number,
        name: string,
        books: { title: string, authorName: string }[]
    } | null,

};

export const INITIAL_STATE: INITIAL_STATE_TYPE = {
    isLoading: false,
    data: null,
};

const {name, reducer, ...rest} = createSlice({
    name: 'list',
    initialState: INITIAL_STATE,
    reducers: {

        startLoading: (state) => {
            state.isLoading = true;
            state.data = null;
        },
        errorLoading: (state) => {
            state.isLoading = false;
            state.data = null;
        },
        successLoadingData: (state, {payload}: {
            payload: {
                data: { id: number, name: string, books: { title: string, authorName: string, id: number }[] }
            }
        }) => {
            state.isLoading = false;
            state.data = payload.data;
        },
    },
});

const slice = {
    name,
    reducer,
    ...rest,
};
export default slice
