import { React, useEffect, useState } from 'react';
import { getComments, deleteComment } from '../utils/api';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const Comments = props => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const user = localStorage.getItem('user');

    useEffect(() => {
        getComments(id)
            .then(({ data }) => {
                setComments(data.comments);
                setIsLoading(false);
            })
            .catch(err => {
                setError(true);
                setIsLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (props.newComment) {
            props.setNewCommentOne(false);
            comments.unshift(props.comment);
        }
    }, [props.newComment]);

    const isAuthor = comment => {
        if (user) {
            if (comment.author === JSON.parse(user).username) {
                return true;
            }
        }
        return false;
    };

    const handleDelete = (event, comment_id) => {
        event.preventDefault();
        setIsLoading(true);
        deleteComment(comment_id)
            .then(() => {
                setComments(prevComments => {
                    return prevComments.filter(comment => {
                        return comment.comment_id !== comment_id;
                    });
                });
                window.alert('Comment deleted');
            })
            .catch(err => {
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    if (error) return <h1>Could not load comments</h1>;

    return (
        <div>
            <h2>Comments</h2>
            <ul className="comments-list">
                {comments.length > 0 &&
                    comments.map(comment => {
                        return (
                            <li
                                className="comments-list-item"
                                key={comment.comment_id}
                            >
                                <p>{comment.body}</p>
                                <p>
                                    <span className="bold-styling"> Author: </span>
                                    {comment.author}
                                </p>
                                <p>
                                    <span className="bold-styling"> Votes: </span>
                                    {comment.votes}
                                </p>
                                <p>
                                    <span className="date-size">{dayjs(comment.created_at).format('MMMM D, YYYY h:mm A')}</span>
                                </p>
                                {isAuthor(comment) && (
                                    <button
                                        disabled={isLoading}
                                        className="delete-btn"
                                        onClick={event => {
                                            handleDelete(event, comment.comment_id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Comments;
