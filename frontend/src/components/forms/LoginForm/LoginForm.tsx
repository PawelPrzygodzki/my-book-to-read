import React, {FC} from 'react';
import classes from './LoginForm.module.scss';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import ROUTES from "../../../app/routes";

type LoginFormProps = {
    isLoading: boolean
    onSubmit: (values: { email: string, password: string }) => void
}
const LoginForm: FC<LoginFormProps> = ({onSubmit, isLoading}) => {
    return (
        <Form
            name="login"
            className={classes.loginForm}
            onFinish={onSubmit}
            disabled={isLoading}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="E-mail"/>
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className={classes.loginFormButton}>
                    Log in
                </Button>
                Or <Link to={ROUTES.REGISTER}>register now!</Link>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
