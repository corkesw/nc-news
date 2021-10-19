import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getArticle } from '../../utils/api';

const Article = () => {
    const [article, setArticle] = useState([])
    const {article_id} = useParams()
    
    useEffect( () => {
        getArticle(article_id)
        .then((articleFromApi) => {
            setArticle(articleFromApi)
        })

    }, [article_id])

    return (
        <section>
           <p>{article.title}</p>
           <p>Topic: {article.topic.toUpperCase()} Author: {article.author}</p>
           <p>Date posted: {`${new Date(article.created_at).getDate()}/${new Date(article.created_at).getMonth()}/${new Date(article.created_at).getFullYear()}`}</p>
        </section>
    );
};

export default Article;