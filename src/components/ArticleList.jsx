import { React, useState } from 'react';

const ArticleList = props => {
    return (
        <div>
            <ul className='article-list'>
                {props.articles.map(article => {
                    return (
                        <li className='article-list-item' key={article.article_id}>
                            <h2>{article.title}</h2>
                            <p>Topic: {article.topic}</p>
                            <img
                                src={article.article_img_url}
                                alt={article.title}
                            />
                            <p>{article.body}</p>
                            <p>Author: {article.author}</p>
                            <p>Created at: {article.created_at}</p>
                            <p>Votes: {article.votes}</p>
                            <p>Comment count: {article.comment_count}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ArticleList;
