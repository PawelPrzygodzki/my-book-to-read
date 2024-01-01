import React, {FC, useCallback} from "react";
import {Form, Modal} from "antd";
import CreateListForm from "../forms/CreateListForm";

type CreateListModalProps = {
    isOpen: boolean,
    isLoading: boolean,
    onCancel: () => void,
    onSubmit: (data: { name: string }) => void,
}
const CreateListModal: FC<CreateListModalProps> = ({isOpen, isLoading, onSubmit, onCancel}) => {
    const [form] = Form.useForm();

    const onOk = useCallback(() => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onSubmit(values);
            })
    }, [form, onSubmit]);

    return (
        <Modal title="Create list" open={isOpen} onOk={onOk} onCancel={onCancel} okText={'Create'}
               okButtonProps={{type: "primary", htmlType: "submit"}}>
            <CreateListForm form={form} isLoading={isLoading} onSubmit={onSubmit}/>
        </Modal>
    );
}

export default CreateListModal;
