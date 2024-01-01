import {createSlice} from '@reduxjs/toolkit';
import StateTypes from "../../../types/State.types";

type INITIAL_STATE_TYPE = {
    isLoading: boolean,
    state: StateTypes
};

export const INITIAL_STATE: INITIAL_STATE_TYPE = {
    isLoading: false,
    state: null
};

const {name, reducer, ...rest} = createSlice({
    name: 'login',
    initialState: INITIAL_STATE,
    reducers: {
        resetState: (state) => {
            state.isLoading = false;
            state.state = null;
        },
        startLogin: (state) => {
            state.isLoading = true;
            state.state = null;
        },
        errorLogin: (state) => {
            state.isLoading = false;
            state.state = 'error';
        },
        successLogin: (state) => {
            state.isLoading = false;
            state.state = 'success';
        },
    },
});

const slice = {
    name,
    reducer,
    ...rest,
};
export default slice
