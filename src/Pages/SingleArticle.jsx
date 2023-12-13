import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle, postComment } from '../utils/api';
import dayjs from 'dayjs';
import Comments from '../components/Comments';
import Form from 'react-bootstrap/Form';
import { updateVotes, getArticle, updateDownVotes } from '../utils/api';
import { HandThumbsDownFill, HandThumbsUpFill } from 'react-bootstrap-icons';

const SingleArticle = props => {
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

    const handleVote = (event, article_id) => {
        event.preventDefault();
        setArticle(prevArticle => ({
            ...prevArticle,
            votes: prevArticle.votes + 1,
        }));
        updateVotes(article_id)
            .then(({ data }) => {
                setArticle(data.article);
            })
            .catch(err => {
                setArticle(prevArticle => ({
                    ...prevArticle,
                    votes: prevArticle.votes - 1,
                }));
            });
    };

    const handleDownVote = (event, article_id) => {
        event.preventDefault();

        setArticle(prevArticle => ({
            ...prevArticle,
            votes: prevArticle.votes - 1,
        }));

        updateDownVotes(article_id)
            .then(({ data }) => {
                setArticle(data.article);
            })
            .catch(err => {
                setArticle(prevArticle => ({
                    ...prevArticle,
                    votes: prevArticle.votes + 1,
                }));
            });
    };

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
        window.alert(`comment has been submitted successfully`)
        postComment(comment)
            .then(({ data }) => {
                setArticle(prevArticle => ({
                    ...prevArticle,
                    comment_count: prevArticle.comment_count + 1,
                }));
                setComment(data.comments.comment.rows[0]);
            })
            .catch(err => {
                setError(true);
                setIsLoading(false);
            });  
    };

    if (error) return <h1>Something went wrong!</h1>;
    if (isLoading) return <p>Loading...</p>;

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
                <br />
                <button
                    className="votes-btn"
                    onClick={event => {
                        handleVote(event, article.article_id);
                    }}
                >
                    <HandThumbsUpFill />
                    Like
                </button>
                <button
                    className="votes-btn"
                    onClick={event => {
                        handleDownVote(event, article.article_id);
                    }}
                >
                    <HandThumbsDownFill />
                    Dislike
                </button>
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

                        <button type="submit">Submit</button>
                    </Form>
                )}

                <Comments comment={comment} />
            </div>
        </div>
    );
};

export default SingleArticle;
