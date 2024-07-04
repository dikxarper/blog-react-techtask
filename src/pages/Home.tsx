import React, { useState, useEffect, useRef } from "react";
import PostList from "../components/PostList/PostList";
import { Pagination, Button, Modal, notification } from "antd";

interface Post {
    id: number;
    title: string;
    body: string;
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const postListRef = useRef<HTMLDivElement>(null);
    const [api, contextHolder] = notification.useNotification();

    const fetchPosts = async (page: any) => {
        setLoading(true);
        try {
            const response = await fetch(`https://dummyjson.com/posts?skip=${(page - 1) * 5}&limit=5&select=id,body,title`);
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500)
        }
    };

    const addPost = async() => {
        try {
            const response = await fetch('https://dummyjson.com/posts/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    body: text,
                    userId: 1
                })
            });
            const data = await response.json();
            console.log(data);
            openNotification('Success!', 'Post was added.\n (Примечание: Добавление новой записи не приведет к ее добавлению на сервер. Он смоделирует запрос и вернет новую созданную запись в виде JSON)', 'success');
            setIsModalOpen(false);
        } catch (error) {
            openNotification('Error!', 'Something went wrong', 'alert');
            console.error('Eror adding post: ', error);
        }
    }

    const openNotification = (message: string | undefined, description: string | undefined, type: any) => {
        api.open({
            message: message,
            description: description,
            duration: 0,
            type: type
        });
    };

    const changeTitle = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    }

    const changeText = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(event.target.value);
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const scrollToPostList = () => {
        if (postListRef.current) {
            postListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        fetchPosts(1);
    }, []);

    return (
        <div>
            <div className='upper__section'>
                {contextHolder}
                <Button type="primary" className="add-btn" onClick={showModal}>Add post</Button>
                <Modal title="New Post" open={isModalOpen} onOk={addPost} onCancel={handleCancel}>
                    <form id="add-modal-form">
                        <div className="form-element">
                            <label className="form-label" htmlFor="">Title</label>
                            <input type="text" id="title" className="form-input" onChange={changeTitle} value={title} />
                        </div>
                        <div className="form-element">
                            <label className="form-label" htmlFor="">Text</label>
                            <textarea id="text" className="form-input" rows={10} onChange={changeText} value={text} />
                        </div>
                    </form>
                </Modal>
            </div>
            <PostList posts={posts} loading={loading} />
            <Pagination defaultCurrent={1} total={50} onChange={(page) => {fetchPosts(page); scrollToPostList}} />
        </div>
    );
};

export default Home;