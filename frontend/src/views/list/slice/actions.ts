import slice from './slice';
import {AppThunk} from '../../../app/store';
import {AxiosError} from "axios/index";
import API from "../../../services/ApiService";

const {
    successLoadingData,
    errorLoading,
    startLoading
} = slice.actions;

const fetchListData = (id: number): AppThunk => (
    async (dispatch) => {
        dispatch(startLoading());
        try {
            const {data} = await API.lists.getOne(id);

            dispatch(successLoadingData({data}))
        } catch (e) {
            window.alert('Can not fetch list data')
            const {response} = e as AxiosError<any>;
            console.log(JSON.stringify(response))
            dispatch(errorLoading())
            // TODO add better error handling
        }
    }
);

const addBookToList = (listId: number, bookKey: string): AppThunk => (
    async (dispatch) => {
        dispatch(startLoading());
        try {
            await API.lists.addBookToList(listId, bookKey);

            dispatch(fetchListData(listId))
        } catch (e) {
            window.alert('Can not add book to list')
            const {response} = e as AxiosError<any>;
            console.log(JSON.stringify(response))
            dispatch(errorLoading())
            // TODO add better error handling
        }
    }
);

const removeBookFromList = (listId: number, bookId: number): AppThunk => (
    async (dispatch) => {
        dispatch(startLoading());
        try {
            await API.lists.removeBookFromList(listId, bookId);

            dispatch(fetchListData(listId))
        } catch (e) {
            window.alert('Can not remove book from list')
            const {response} = e as AxiosError<any>;
            console.log(JSON.stringify(response))
            dispatch(errorLoading())
            // TODO add better error handling
        }
    }
);

export {
    fetchListData,
    addBookToList,
    removeBookFromList
};
