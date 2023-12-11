import {React, useState} from 'react'

const ArticleList = props => {
    const [articles, setArticles] = useState([])
  return (

    <ul>
        {props.articles.map(article => (
            
        )
          
)}
    </ul>
  )
}

export default ArticleList