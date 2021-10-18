import React, { useEffect, useState } from 'react';
import { getArticles } from '../../utils/api';
import '../../Css/Articles.css'
import { Link } from 'react-router-dom';

const Articles = () => {
    
    const [articles, setArticles] = useState([])

    useEffect( () => {
        getArticles()
        .then ((articlesFromApi) => {
            setArticles(articlesFromApi)
        })
    }, [])

    return (
        <section className="articles">
            {articles.map((article) => {
                return (
                <div className="article__div" key={article.article_id}>
                    <Link to={`/article/${article.article_id}`}>
                <p>{article.title}</p>
                <p>Topic: {article.topic.toUpperCase()} Author: {article.author} </p>
                </Link>
                </div>)
            })}
        </section>
    );
};

export default Articles;