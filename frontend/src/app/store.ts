import {configureStore, ThunkAction, Action, combineReducers, Slice} from "@reduxjs/toolkit"
import registerSlice from "../views/register/slice/slice"
import loginSlice from "../views/login/slice/slice"
import listsSlice from "../views/lists/slice/slice"
import listSlice from "../views/list/slice/slice"

export const mapSliceToReducers = (slices: Slice[]) => slices
    .map((slice) => ({[slice.name]: slice.reducer}))
    .reduce((previous, current) => ({...previous, ...current}), {});

export const store = configureStore({
    reducer: combineReducers(mapSliceToReducers([
        registerSlice,
        loginSlice,
        listSlice,
        listsSlice
    ])),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
