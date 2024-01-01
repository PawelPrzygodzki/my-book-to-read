import React, {FC} from 'react';
import classes from './RegisterForm.module.scss';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

type RegisterFormProps = {
    isLoading: boolean
    onSubmit: (values: { email: string, password: string }) => void
}
const RegisterForm: FC<RegisterFormProps> = ({onSubmit, isLoading}) => {
    return (
        <Form
            name="register"
            className={classes.registerForm}
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
            <Form.Item
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password once again!',
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon"/>}
                    type="password"
                    placeholder="Confirm password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className={classes.registerFormButton}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;
