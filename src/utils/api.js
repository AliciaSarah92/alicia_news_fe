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

function postComment(id, comment) {
    return api.post(`/articles/${id}/comments/${comments_id}`, comment);
}


export { getArticles, getArticle, getComments, postComment, getUsers };
