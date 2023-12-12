import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Comments from '../components/Comments';
import { updateVotes, getArticle, updateDownVotes } from '../utils/api';
import { HandThumbsDownFill, HandThumbsUpFill } from 'react-bootstrap-icons';

const SingleArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

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
                setIsLoading;
            });
    }, [id]);

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
                <Comments />
            </div>
        </div>
    );
};

export default SingleArticle;
