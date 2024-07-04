import React, { useState, useEffect, useRef } from "react";
import PostList from "../components/PostList/PostList";
import { Pagination, Button, Modal, notification } from "antd";

interface Post {
    deleted: false;
    id: number;
    title: string;
    text: string;
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const postListRef = useRef<HTMLDivElement>(null);
    const [api, contextHolder] = notification.useNotification();

    const [totalPosts, setTotalPosts] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchPosts = async (page: number) => {
        setLoading(true);
        try {
            const response = await fetch('https://6686864e83c983911b029ea6.mockapi.io/api/blog/articles');
            const data = await response.json();
            setTotalPosts(data.length);
            const itemsPerPage = 5;
            const totalPages = Math.ceil(data.length / itemsPerPage);
            console.log("Total posts: " + data.length);

            if (page < 1 || page > totalPages) {
                console.warn(`Invalid page number: ${page}. Defaulting to page 1.`);
                page = 1;
            }
            const startIndex = (page - 1) * itemsPerPage;
            console.log("Start index: " + startIndex);
            const endIndex = Math.min(startIndex + itemsPerPage, data.length);
            console.log("End index: " + endIndex);
            const paginatedData = data.slice(startIndex, endIndex);
            setPosts(paginatedData);
            setCurrentPage(page);
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
            const response = await fetch('https://6686864e83c983911b029ea6.mockapi.io/api/blog/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    text,
                })
            });
            await response.json();
            setIsModalOpen(false);
            setTitle('');
            setText('');
            fetchPosts(Math.ceil((totalPosts + 1) / 5));
            openNotification('Success!', 'Post was added!', 'success');
        } catch (error) {
            openNotification('Error!', 'Something went wrong', 'alert');
            console.error('Error adding post: ', error);
        }
    }

    const openNotification = (message: string | undefined, description: string | undefined, type: any) => {
        api.open({
            message: message,
            description: description,
            duration: 2,
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
            <Pagination current={currentPage} defaultCurrent={1} pageSize={5} total={totalPosts} onChange={(page) => { fetchPosts(page); scrollToPostList(); }} />
        </div>
    );
};

export default Home;