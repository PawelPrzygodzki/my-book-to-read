import slice from './slice';
import {AppThunk} from '../../../app/store';
import API from '../../../services/ApiService';
import {CreateUserTypes} from "../../../services/types/CreateUser.types";
import {AxiosError} from "axios";

const {
    startCreateUser,
    errorCreateUser,
    successCreateUser,
    resetState,
} = slice.actions;

const registerNewUser = (payload: CreateUserTypes): AppThunk => (
    async (dispatch) => {
        dispatch(startCreateUser());
        try {
            await API.auth.register(payload);
            dispatch(successCreateUser());
        } catch (e) {
            const {response} = e as AxiosError<{ message: string }>;
            window.alert(`Can not register user please try again: ${response ? response.data.message : ''}`)

            console.log(JSON.stringify(response))

            dispatch(errorCreateUser());
            // TODO add better error handling
        }
    }
);

export {
    registerNewUser,
    resetState
};
