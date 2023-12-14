import {React, useState, useEffect} from 'react'
import ArticleList from '../components/ArticleList'
import { getArticles } from '../utils/api'
import { useParams } from 'react-router-dom'

const Articles = () => {
    const { topic } = useParams() 
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getArticles(topic)
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

export default Articles