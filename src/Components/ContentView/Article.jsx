import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getArticle } from '../../utils/api';

const Article = () => {
    const [article, setArticle] = useState([])
    const {article_id} = useParams()
    console.log(article_id, '<<<<<<< article.jsx')

    useEffect( () => {
        getArticle(article_id)
        .then((articleFromApi) => {
            setArticle(articleFromApi)
        })

    }, [])

    return (
        <section>
           {article.body}
        </section>
    );
};

export default Article;