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

export { getArticles, getArticle, getComments };
