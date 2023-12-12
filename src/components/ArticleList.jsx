import { React, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const ArticleList = props => {
    return (
        <div>
            <ul className="article-list">
                {props.articles && props.articles.map(article => {
                    return (
                        <li
                            className="article-list-item"
                            key={article.article_id}
                        >
                            <h2>{article.title}</h2>
                            <p>
                                <span className="bold-styling">Topic: </span>
                                {article.topic}
                            </p>
                            <img
                                src={article.article_img_url}
                                alt={article.title}
                            />
                            <p>{article.body}</p>
                            <p>
                                <span className="bold-styling">Author: </span>
                                {article.author}
                            </p>

                            <p>
                                <span className="bold-styling">Votes: </span>
                                {article.votes}
                            </p>
                            <p>
                                <span className="bold-styling">Comment count: </span>
                                {article.comment_count}
                            </p>
                            <p className='date-size'>
                               Created at: {dayjs(article.created_at).format('MMMM D, YYYY h:mm A')}
                            </p>
                            <Link className='link-btn' to={`/articles/${article.article_id}`}>Read more</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ArticleList;
