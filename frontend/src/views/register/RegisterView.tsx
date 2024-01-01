import React, {
    FC, useCallback, useEffect,
} from 'react';
import RegisterForm from "../../components/forms/RegisterForm";
import {registerNewUser, resetState} from "./slice/actions";
import {CreateUserTypes} from "../../services/types/CreateUser.types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getIsLoading, getState} from "./slice/selectors";
import ROUTES from "../../app/routes";
import {useNavigate} from "react-router-dom";

const RegisterView: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isLoading = useAppSelector(getIsLoading);
    const state = useAppSelector(getState);

    const registerUser = useCallback((data: CreateUserTypes) => {
        dispatch(registerNewUser({
            email: data.email,
            password: data.password,
        }));

    }, [dispatch]);

    useEffect(() => {
        if (state === 'success') {
            navigate(ROUTES.LOGIN)
            dispatch(resetState())
        }
    }, [isLoading, state, dispatch, navigate])
    return (
        <>
            <RegisterForm onSubmit={registerUser} isLoading={isLoading}/>
        </>
    );
};

export default RegisterView;
