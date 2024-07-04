import React from 'react';
import styles from './PostList.module.css';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface Props {
    posts: Post[];
    loading: boolean;
}

const PostList: React.FC<Props> = ({ posts, loading }) => {
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.posts}>
                    {posts.map(post => (
                        <div className={styles.post} key={post.id}>
                            <div className={styles.title}>{post.title}</div>
                            <p className={styles.body}>{post.body}</p>
                            <Link to={`post/${post.id}`} className={styles.link}>
                                <span>Read More</span>
                                <ArrowRightOutlined className={styles.arrow__icon}/>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostList;