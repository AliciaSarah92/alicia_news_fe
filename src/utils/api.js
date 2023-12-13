import axios from 'axios';

const api = axios.create({
    baseURL: 'https://alicia-news.onrender.com/api'
})

function getArticles() {
    return api.get('/articles');
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


export { getArticles, getArticle, getComments, postComment, getUsers };
