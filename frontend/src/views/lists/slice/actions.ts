import slice from './slice';
import {AppThunk} from '../../../app/store';
import {AxiosError} from "axios/index";
import API from "../../../services/ApiService";
import {CreateListTypes} from "../../../services/types/CreateList.types";

const {
    successLoadingData,
    errorLoading,
    startLoading
} = slice.actions;

const fetchUserLists = (): AppThunk => (
    async (dispatch) => {
        dispatch(startLoading());
        try {
            const {data: {items}} = await API.lists.getAll();


            dispatch(successLoadingData({items}))
        } catch (e) {
            window.alert('Can not fetch user lists')
            const {response} = e as AxiosError<any>;
            console.log(JSON.stringify(response))
            dispatch(errorLoading())
            // TODO add better error handling
        }
    }
);

const createUserList = (payload: CreateListTypes): AppThunk => (
    async (dispatch) => {
        dispatch(startLoading());
        try {
            await API.lists.create(payload);


            dispatch(fetchUserLists())
        } catch (e) {
            window.alert('Can not create new list')
            const {response} = e as AxiosError<any>;
            console.log(JSON.stringify(response))
            dispatch(errorLoading())
        }
    }
);

const removeUserList = (id: number): AppThunk => (
    async (dispatch) => {
        dispatch(startLoading());
        try {
            await API.lists.delete(id);


            dispatch(fetchUserLists())
        } catch (e) {
            window.alert('Can not delete user list')
            const {response} = e as AxiosError<any>;
            console.log(JSON.stringify(response))
            dispatch(errorLoading())
        }
    }
);

export {
    fetchUserLists,
    createUserList,
    removeUserList
};
