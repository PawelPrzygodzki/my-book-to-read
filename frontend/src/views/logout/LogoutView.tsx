import React, {
    FC, useCallback, useEffect,
} from 'react';
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import ROUTES from "../../app/routes";
import {logOut} from "./slice/actions";
import {Spin} from "antd";

const LogoutView: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutUser = useCallback(() => {
        dispatch(logOut());
    }, [dispatch]);

    useEffect(() => {
        logoutUser()
        navigate(ROUTES.LOGIN)
    }, [logoutUser, navigate]);

    return <Spin spinning/>
};

export default LogoutView;
