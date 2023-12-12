import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticle } from '../utils/api';
import dayjs from 'dayjs';
import Comments from '../components/Comments';

const SingleArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getArticle(id).then(({ data }) => {
            setArticle(data);
        })
        .catch(err => {
            setError(true);
            setIsLoading
        })
    }, [id]);

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
                <Comments />
            </div>
        </div>
    );
};

export default SingleArticle;
