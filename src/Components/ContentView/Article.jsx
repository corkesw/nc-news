import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getArticle, incArticleVote } from '../../utils/api';
import "../../Css/Articles.css"

const Article = () => {
    const [article, setArticle] = useState([])
    const {article_id} = useParams()
    const [votes, setVotes] = useState()
    const [err, setErr] = useState(null)
    console.log(err, "<<<<<<<err")
    
    useEffect( () => {
        getArticle(article_id)
        .then((articleFromApi) => {
            const topic = articleFromApi.topic.toUpperCase()
            articleFromApi.topic = topic
            setArticle(articleFromApi)
            setVotes(articleFromApi.votes)
        })

    }, [article_id])

    const handleVoteClick = () => {
        setVotes((currVotes) => currVotes +1)
        setErr(null)
        const err = incArticleVote(votes, article_id)
        .catch((error) => {
            setVotes((currVotes) => currVotes -1)
            setErr('Something went wrong, please try again later')
        })
    }

    console.log(votes, '<<<<< votes')
    return (
        <section className="article__div">
           <p className="article--title">{article.title}</p>
           <p class="article--details">Topic: {article.topic} Author: {article.author}</p>
           <p className="article--details">Date posted: {`${new Date(article.created_at).getDate()}/${new Date(article.created_at).getMonth()}/${new Date(article.created_at).getFullYear()}`}</p>
           <p>{article.body}</p>
           <button type="button" onClick={handleVoteClick}>Votes: {votes}</button>
           {err ? <p>{err}</p> : null}
        </section>
    );
};

export default Article;