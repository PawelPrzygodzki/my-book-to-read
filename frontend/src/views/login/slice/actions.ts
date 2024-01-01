import slice from './slice';
import {AppThunk} from '../../../app/store';
import {AxiosError} from "axios/index";
import API from "../../../services/ApiService";
import {LogInUserTypes} from "../../../services/types/LogInUser.types";

const {
    startLogin,
    errorLogin,
    resetState,
    successLogin,
} = slice.actions;

const logIn = (payload: LogInUserTypes): AppThunk => (
    async (dispatch) => {
        dispatch(startLogin());
        try {
            const {data: { accessToken }} = await API.auth.logIn(payload);

            localStorage.setItem('token', accessToken);

            dispatch(successLogin())
        } catch (e) {
            window.alert('Can not login user please try again')
            const {response} = e as AxiosError<any>;
            console.log(JSON.stringify(response))
            dispatch(errorLogin())
            // TODO add better error handling
        }
    }
);

export {
    logIn,
    resetState
};
