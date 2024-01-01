import {createSlice} from '@reduxjs/toolkit';

type INITIAL_STATE_TYPE = {
    isLoading: boolean,
    items: { id: number, name: string } [],
};

export const INITIAL_STATE: INITIAL_STATE_TYPE = {
    isLoading: false,
    items: [],
};

const {name, reducer, ...rest} = createSlice({
    name: 'lists',
    initialState: INITIAL_STATE,
    reducers: {

        startLoading: (state) => {
            state.isLoading = true;
            state.items = [];
        },
        errorLoading: (state) => {
            state.isLoading = false;
            state.items = [];
        },
        successLoadingData: (state, {payload}: { payload: { items: { id: number, name: string }[] } }) => {
            state.isLoading = false;
            state.items = payload.items;
        },
    },
});

const slice = {
    name,
    reducer,
    ...rest,
};
export default slice
