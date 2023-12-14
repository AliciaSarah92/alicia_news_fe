import axios from 'axios';

const api = axios.create({
    baseURL: 'https://alicia-news.onrender.com/api',
});

function getArticles(topic, sort) {
    let query = '/articles';
    if (topic) {
        query += `?topic=${topic}`;
    }
    if (sort) {
        query += `?${sort}`;
    }
    return api.get(query);
}

function getArticle(id) {
    return api.get(`/articles/${id}`);
}

function getComments(id) {
    return api.get(`/articles/${id}/comments`);
}

function getUsers() {
    return api.get('/users');
}

function postComment(params) {
    const {username, body, article_id} = params;
    return api.post(`/articles/${article_id}/comments`, {username:username, body:body, article_id:article_id});
}

function updateVotes(id) {
    return api.patch(`/articles/${id}`, { inc_votes: 1 });
}

function updateDownVotes(id) {
    return api.patch(`/articles/${id}`, { inc_votes: -1 });
}

function deleteComment(id) {
    return api.delete(`/comments/${id}`);
}

function getTopics() {
    return api.get('/topics');
}   

export { getArticles, getArticle, getComments, updateVotes, updateDownVotes, postComment, getUsers, deleteComment, getTopics };
