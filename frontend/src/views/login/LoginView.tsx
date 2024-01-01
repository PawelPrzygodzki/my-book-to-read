import React, {
    FC, useCallback, useEffect,
} from 'react';
import LoginForm from "../../components/forms/LoginForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import ROUTES from "../../app/routes";
import {LogInUserTypes} from "../../services/types/LogInUser.types";
import {logIn, resetState} from "./slice/actions";
import {getIsLoading} from "./slice/selectors";
import useAuthToken from "../../hooks/useAuthToken";

const LoginView: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useAppSelector(getIsLoading);
    const isValidToken = useAuthToken();

    const loginUser = useCallback((data: LogInUserTypes) => {
        dispatch(logIn({
            email: data.email,
            password: data.password,
        }));

    }, [dispatch]);

    useEffect(() => {

        if (isValidToken) {
            navigate(ROUTES.LISTS)
            dispatch(resetState())
        }
    }, [isLoading, isValidToken, dispatch, navigate])
    return (
        <>
            <LoginForm onSubmit={loginUser} isLoading={isLoading}/>
        </>
    );
};

export default LoginView;
