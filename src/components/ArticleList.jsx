import { React, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const ArticleList = props => {
    const navigate = useNavigate();
    const handleClick = (event, id) => {
        event.preventDefault();
        navigate(`/articles/${id}`, { state: { id } });
    };


    return (
        <div>
            <ul className='article-list'>
                {props.articles.map(article => {
                    return (
                        <li className='article-list-item' key={article.article_id}>
                            <h2>{article.title}</h2>
                            <p><span style={{fontWeight: 'bold'}}>Topic: </span>{article.topic}</p>
                            <img
                                src={article.article_img_url}
                                alt={article.title}
                            />
                            <p>{article.body}</p>
                            <p><span style={{fontWeight: 'bold'}}>Author: </span>{article.author}</p>
                            <p><span style={{fontWeight: 'bold'}}>Created at: </span>{dayjs(article.created_at).format('MMMM D, YYYY h:mm A')}</p>
                            <p><span style={{fontWeight: 'bold'}}>Votes: </span>{article.votes}</p>
                            <p><span style={{fontWeight: 'bold'}}>Comment count: </span>{article.comment_count}</p>
                            <button onClick={event => handleClick(event, article.article_id)}>Read more</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ArticleList;
