import React from 'react';
import { Modal } from 'antd';
import styles from './PostModal.module.css';

interface ModalProps {
    title: string;
    onOk: () => void;
    onCancel: () => void;
    onChangeTitle: (value: string) => void;
    onChangeText: (value: string) => void;
    titleValue: string;
    textValue: string;
}

const PostModal: React.FC<ModalProps> = ({
    title,
    onOk,
    onCancel,
    onChangeTitle,
    onChangeText,
    titleValue,
    textValue,
}) => {
    return (
        <Modal title={title} onOk={onOk} onCancel={onCancel}>
            <form id="add-modal-form">
                <div className={styles.form__element}>
                    <label className={styles.form__label}>Title</label>
                    <input type="text" id="title" className={styles.form__input} onChange={(e) => onChangeTitle(e.target.value)} value={titleValue} />
                </div>
                <div className={styles.form__element}>
                    <label className={styles.form__label}>Text</label>
                    <textarea id="text" className={styles.form__input} rows={10} onChange={(e) => onChangeText(e.target.value)} value={textValue} />
                </div>
            </form>
        </Modal>
    );
};

export default PostModal;