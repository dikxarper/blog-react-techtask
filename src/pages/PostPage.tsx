import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const PostPage: React.FC = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalText, setModalText] = useState('');
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const fetchPost = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/posts/${id}`);
            const data = await response.json();
            setTitle(data.title);
            setText(data.body);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500)
        }
    };

    const changeModalTitle = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setModalTitle(event.target.value);
    }

    const changeModalText = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setModalText(event.target.value);
    }

    const showModal = () => {
        setModalTitle(title);
        setModalText(text);
        setIsModalOpen(true);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const editPost = async() => {
        try {
            const response = await fetch(`https://dummyjson.com/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  title: modalTitle,
                  body: modalText
                })
            });
            const data = await response.json();
            console.log(data);
            setTitle(modalTitle);
            setText(modalText);
            setIsModalOpen(false);
            openNotification('Success!', 'Post was edited.\n (Примечание: Изменение записи не приведет к ее изменению на сервере)', 'success');
        } catch (error) {
            openNotification('Error!', 'Something went wrong', 'alert');
            console.error('Eror editing post: ', error);
        }
    }

    const deletePost = async() => {
        try {
            const response = await fetch(`https://dummyjson.com/posts/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);
            openNotification('Success!', 'Post was deleted. You will be redirected in 5s...\n (Примечание: Удаление записи не приведет к ее удалению на сервере)', 'success');
            setTimeout(() => {
                navigate(-1);
            }, 5000)
        } catch (error) {
            openNotification('Error!', 'Something went wrong', 'alert');
            console.error('Eror deleting post: ', error);
        }
    }

    const openNotification = (message: string | undefined, description: string | undefined, type: any) => {
        api.open({
            message: message,
            description: description,
            duration: 3,
            type: type
        });
    };

    useEffect(() => {
        fetchPost();
    }, [id]);

    return (
        <div>
            <a onClick={() => {navigate(-1)}} className='back-btn'>
                <ArrowLeftOutlined/>
                <span>Back</span>
            </a>
            {title && text ? (
                <>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {contextHolder}
                        <h3>{title}</h3>
                        <p>{text}</p>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                            <Button type='primary' onClick={showModal}>Edit</Button>
                            <Button type='primary' danger onClick={deletePost}>Delete</Button>
                        </div>
                        <Modal title="Edit Post" open={isModalOpen} onOk={editPost} onCancel={handleCancel}>
                            <form id="add-modal-form">
                                <div className="form-element">
                                    <label className="form-label" htmlFor="">Title</label>
                                    <input type="text" id="title" className="form-input" onChange={changeModalTitle} value={modalTitle} />
                                </div>
                                <div className="form-element">
                                    <label className="form-label" htmlFor="">Text</label>
                                    <textarea id="text" className="form-input" rows={10} onChange={changeModalText} value={modalText} />
                                </div>
                            </form>
                        </Modal>
                    </>
                )}
                </>
            ) : (
                <p>Post not found or loading...</p>
            )}
        </div>
    );
};

export default PostPage;