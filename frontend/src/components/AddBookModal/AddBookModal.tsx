import React, {FC, useCallback, useState} from "react";
import {AutoComplete, Modal} from "antd";
import API from "../../services/ApiService";

type AddBookModalProps = {
    isOpen: boolean,
    isLoading: boolean,
    onCancel: () => void,
    onSubmit: (bookKey: string) => void,
}
const AddBookModal: FC<AddBookModalProps> = ({isOpen, isLoading, onSubmit, onCancel}) => {
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);

    const onSearch = useCallback(async (text: string) => {
        try {
            const {items} = await API.books.search(text);

            setOptions(
                items.map((item) => ({value: item.key, label: `${item.title} (${item.authorName})`}))
            )
        } catch (e) {
            console.log(e) // TODO add better error handling
            setOptions([])
        }
    }, [])

    return (
        <Modal title="Select book" open={isOpen} footer={null} onCancel={onCancel}>
            <AutoComplete
                options={options}
                disabled={isLoading}
                style={{width: '300px'}}
                onSelect={(bookKey) => onSubmit(bookKey)}
                onSearch={onSearch}
                placeholder="Search a book..."
            />
        </Modal>
    );
}

export default AddBookModal;
