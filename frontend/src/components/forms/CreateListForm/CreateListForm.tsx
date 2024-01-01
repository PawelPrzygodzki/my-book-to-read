import React, {FC} from 'react';
import classes from './CreateListForm.module.scss';
import {Form, FormInstance, Input} from 'antd';

type LoginFormProps = {
    form: FormInstance,
    isLoading: boolean
    onSubmit: (values: { name: string }) => void
}
const CreateListForm: FC<LoginFormProps> = ({form, onSubmit, isLoading}) => {
    return (
        <Form
            name="list"
            form={form}
            className={classes.form}
            onFinish={onSubmit}
            disabled={isLoading}
        >
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input list name!',
                    },
                ]}
            >
                <Input placeholder="Name"/>
            </Form.Item>
        </Form>
    );
};

export default CreateListForm;
