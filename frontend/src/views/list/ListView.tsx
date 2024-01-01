import React, {
    FC, useCallback, useEffect, useState,
} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getData, getIsLoading} from "./slice/selectors";
import classes from './ListView.module.scss'
import {addBookToList, fetchListData, removeBookFromList} from "./slice/actions";
import {Button, Col, List, Row, Spin, Typography} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import ROUTES from "../../app/routes";
import {BookOutlined, DeleteOutlined} from "@ant-design/icons";
import AddBookModal from "../../components/AddBookModal";

const ListView: FC = () => {
    const dispatch = useAppDispatch();
    const {listId} = useParams();
    const navigate = useNavigate();
    const [isOpenAddBookModal, setIsOpenAddBookModal] = useState<boolean>(false);
    const isLoading = useAppSelector(getIsLoading);
    const data = useAppSelector(getData);

    useEffect(() => {
        if (listId) {
            dispatch(fetchListData(+listId))
        } else {
            navigate(ROUTES.LISTS)
        }
    }, [dispatch, navigate, listId])

    const addBook = useCallback((bookKey: string) => {
        if (listId) {
            dispatch(addBookToList(+listId, bookKey));
            setIsOpenAddBookModal(false)
        }
    }, [listId, dispatch])

    const removeBook = useCallback((bookId: number) => {
        if (listId) {
            dispatch(removeBookFromList(+listId, bookId));
        }
    }, [listId, dispatch])

    if (!data) {
        return <Spin/>
    }

    return (
        <Spin spinning={isLoading}>
            <div className={classes.listHeader}>
                <Row>
                    <Col span={12} className={classes.headerTitle}>
                        <Typography.Title>{data.name}</Typography.Title>
                    </Col>
                    <Col span={12} className={classes.headerAction}>
                        <Button type="primary" onClick={() => setIsOpenAddBookModal(true)}>Add book</Button>
                    </Col>
                </Row>
            </div>
            <List
                loading={isLoading}
                itemLayout="horizontal"
                dataSource={data.books}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button type="primary" shape="circle" icon={<DeleteOutlined/>}
                                    onClick={() => removeBook(item.id)}/>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<BookOutlined/>}
                            title={item.title}
                            description={`Author: ${item.authorName}`}
                        />
                    </List.Item>
                )}
            />
            <AddBookModal onCancel={() => setIsOpenAddBookModal(false)} isOpen={isOpenAddBookModal}
                          isLoading={isLoading} onSubmit={addBook}/>
        </Spin>
    );
};

export default ListView;
