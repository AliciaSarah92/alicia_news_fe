import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, postComment } from '../utils/api';
import dayjs from 'dayjs';
import Comments from '../components/Comments';
import Form from 'react-bootstrap/Form';

const SingleArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const user = localStorage.getItem('user');
    const initialValue = JSON.parse(user);
    const [comment, setComment] = useState({
        username: initialValue ? initialValue.username : 'Guest',
        body: '',
        article_id: id,
    });

    useEffect(() => {
        getArticle(id)
            .then(({ data }) => {
                setArticle(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(true);
                setIsLoading(false);
            });
    }, [id]);

    const handleChange = event => {
        setComment({
            ...comment,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = event => {
        event.preventDefault();

        postComment(comment)
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                setError(true);
                setIsLoading(false);
            });
    };

    if (error) return <h1>Something went wrong!</h1>;

    return (
        <div>
            <h2>{article.title}</h2>
            <p>
                <span style={{ fontWeight: 'bold' }}>Topic: </span>
                {article.topic}
            </p>
            <img
                src={article.article_img_url}
                alt={article.title}
            />
            <p>{article.body}</p>
            <p>
                <span style={{ fontWeight: 'bold' }}>Author: </span>
                {article.author}
            </p>
            <p>
                <span style={{ fontWeight: 'bold' }}>Created at: </span>
                {dayjs(article.created_at).format('MMMM D, YYYY h:mm A')}
            </p>
            <p>
                <span style={{ fontWeight: 'bold' }}>Votes: </span>
                {article.votes}
            </p>
            <p>
                <span style={{ fontWeight: 'bold' }}>Comment count: </span>
                {article.comment_count}
            </p>
            <div>
                {initialValue && (
                    <Form
                        className="post-comment"
                        onSubmit={handleSubmit}
                    >
                        <Form.Group
                            className="mb-3"
                            controlId="formComment_name"
                        >
                            <Form.Label>Comment: </Form.Label>
                            <Form.Control
                                type="text"
                                name="body"
                                placeholder="Enter comment"
                                value={comment.body}
                                onChange={handleChange}
                            />
                        </Form.Group>
                       
                        <button type='submit'>Submit</button>
                    </Form>
                )}

                <Comments />
            </div>
        </div>
    );
};

export default SingleArticle;
