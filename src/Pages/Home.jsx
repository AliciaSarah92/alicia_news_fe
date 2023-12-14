import { React, useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList';
import { getArticles } from '../utils/api';
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sort, setSort] = useState({ sort_by: 'date', order: 'desc' });

    const handleChange = event => {
        sort.sort_by = event.target.value;
        preGetArticles(sort);
    };

    const handleOrder = event => {
        sort.order = event.target.value;
        preGetArticles(sort)
    };

    const preGetArticles = (sort) => {
        setIsLoading(true);
        let params = objectToQueryString(sort);
        getArticles(false, params).then(({ data }) => {
            setArticles(data.articles);
            setIsLoading(false);
        });
    }

    function objectToQueryString(obj) {
        const keys = Object.keys(obj);
        const keyValuePairs = keys.map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
        });
        return keyValuePairs.join('&');
    }
    useEffect(() => {
       preGetArticles(sort);
    }, []);

    return (
        <div>
            <Header />
            <select onChange={handleChange}>
                <option value="date">Date</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Comment Count</option>
            </select>
            <select onChange={handleOrder}>
                <option name='desc' value="desc">Descending</option>
                <option
                    name="asc"
                    value="asc"
                >
                    Ascending
                </option>
            </select>
            <ArticleList articles={articles} />
        </div>
    );
};

export default Home;
