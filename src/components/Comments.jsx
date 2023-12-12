import { React, useEffect, useState } from 'react';
import { getComments } from '../utils/api';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

const Comments = () => {
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

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

    if (error) return <h1>Could not load comments</h1>;

    return (
        <div>
            <h2>Comments</h2>
            <ul className="comments-list">
                {comments.length &&
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
                                    <span className="bold-styling">{dayjs(comment.created_at).format('MMMM D, YYYY h:mm A')}</span>
                                </p>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default Comments;
