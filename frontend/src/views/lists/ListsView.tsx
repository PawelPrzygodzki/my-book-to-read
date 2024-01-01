import React, {
    FC, useCallback, useEffect, useState,
} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getIsLoading, getItems} from "./slice/selectors";
import classes from './ListsView.module.scss'
import {fetchUserLists, createUserList, removeUserList} from "./slice/actions";
import {Button, Col, List, Row, Spin, Typography} from "antd";
import CreateListModal from "../../components/CreateListModal";
import {useNavigate} from "react-router-dom";
import {getListRoute} from "../../app/routes";
import {DeleteOutlined} from "@ant-design/icons";

const ListsView: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
    const isLoading = useAppSelector(getIsLoading);
    const items = useAppSelector(getItems);

    useEffect(() => {
        dispatch(fetchUserLists())
    }, [dispatch])

    const createList = useCallback((data: { name: string }) => {
        dispatch(createUserList({name: data.name}))
        setIsOpenCreateModal(false)
    }, [dispatch])

    const removeList = useCallback((id: number) => {
        dispatch(removeUserList(id))
    }, [dispatch])

    return (
        <Spin spinning={isLoading}>
            <div className={classes.listHeader}>
                <Row>
                    <Col span={12} className={classes.headerTitle}>
                        <Typography.Title>Your Lists</Typography.Title>
                    </Col>
                    <Col span={12} className={classes.headerAction}>
                        <Button type="primary" onClick={() => setIsOpenCreateModal(true)}>Add list</Button>
                    </Col>
                </Row>
            </div>
            <List
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={items}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type="primary" shape="circle" icon={<DeleteOutlined/>}
                                    onClick={() => removeList(item.id)}/>
                        ]}
                    >
                        <div className={classes.listItemTitle} onClick={() => navigate(getListRoute(item.id))}>
                            <Typography.Text>{item.name}</Typography.Text>
                        </div>
                    </List.Item>
                )}
            />
            <CreateListModal isOpen={isOpenCreateModal} isLoading={isLoading}
                             onCancel={() => setIsOpenCreateModal(false)} onSubmit={createList}/>
        </Spin>
    );
};

export default ListsView;
