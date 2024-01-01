import React, {FC, useMemo} from 'react';
import {Col, Layout, Menu, Row} from 'antd';
import classes from './AppHeader.module.scss';
import {useNavigate} from "react-router-dom";
import ROUTES from "../../app/routes";
import useAuthToken from "../../hooks/useAuthToken";

const {Header} = Layout;
const AppHeader: FC = () => {
    const navigate = useNavigate();
    const isValidToken = useAuthToken();

    const LoggedMenu = useMemo(() => (
        <>
            <Menu.Item
                key="instagram"
                className={classes.menuItem}
                onClick={() => navigate(ROUTES.LISTS)}
            >
                Lists
            </Menu.Item>
            <Menu.Item
                key="logout"
                className={classes.menuItem}
                onClick={() => navigate(ROUTES.LOGOUT)}
            >
                Logout
            </Menu.Item>
        </>
    ), [navigate])

    const UnLoggedMenu = useMemo(() => (
        <>
            <Menu.Item
                key="login"
                className={classes.menuItem}
                onClick={() => navigate(ROUTES.LOGIN)}
            >
                Login
            </Menu.Item>
            <Menu.Item
                key="register"
                className={classes.menuItem}
                onClick={() => navigate(ROUTES.REGISTER)}
            >
                Register
            </Menu.Item>
        </>
    ), [navigate])


    return (
        <Header className={classes.header}>
            <Row gutter={0} className={classes.wrapper}>
                <Col>
                    <Menu
                        className={classes.menu}
                        mode="horizontal"
                        theme="dark"
                        subMenuOpenDelay={0}
                        subMenuCloseDelay={0}
                        triggerSubMenuAction="click"
                    >
                        {isValidToken && LoggedMenu}
                        {!isValidToken && UnLoggedMenu}
                    </Menu>
                </Col>
            </Row>
        </Header>
    );
}

export default AppHeader;
