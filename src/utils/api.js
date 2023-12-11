import axios from 'axios';

const api = axios.create({
    baseUrl: 'https://alicia-news.onrender.com/api'
})

function getArticles() {
    return api.get('https:/alicia-news.onrender.com/api/articles');
}

function getArticle(id) {
    return api.get(`https:/alicia-news.onrender.com/api/articles/${id}`);
}

function getComments(id) {
    return api.get(`https:/alicia-news.onrender.com/api/articles/${id}/comments`);
}

export { getArticles, getArticle, getComments };
