import React from 'react';
import dayjs from 'dayjs';

const Article = props => {
    const { article } = props;

    return (
        <li>
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
        </li>
    );
};

export default Article;
