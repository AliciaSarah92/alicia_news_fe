import {React, useState, useEffect} from 'react'
import ArticleList from '../components/ArticleList'
import { getArticles } from '../utils/api'

const Home = () => {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getArticles()
        .then(({data}) => {
            setArticles(data.articles)
            setIsLoading(false)
        })
    }, [])

  return (
    <div>
        <ArticleList articles={articles} />
    </div>
  )
}

export default Home