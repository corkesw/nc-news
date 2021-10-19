import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getArticle, incVote } from '../../utils/api';
import "../../Css/Articles.css"
import Comments from './Comments';

const Article = () => {
    const [article, setArticle] = useState([])
    const {article_id} = useParams()
    const [votes, setVotes] = useState()
    const [err, setErr] = useState(null)
    const [viewComments, setViewComments] = useState(false)
    
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
        incVote('articles', article_id)
        .catch((error) => {
            setVotes((currVotes) => currVotes -1)
            setErr('Connection error, please try again later')
        })
    }

    const handleCommentClick = () => {
        setViewComments((currView) => {return !currView})
    }

    return (
        <section className="article__div">
           <p className="article--title">{article.title}</p>
           <p class="article--details">Topic: {article.topic} Author: {article.author}</p>
           <p className="article--details">Date posted: {`${new Date(article.created_at).getDate()}/${new Date(article.created_at).getMonth()}/${new Date(article.created_at).getFullYear()}`}</p>
           <p>{article.body}</p>
           <button type="button" onClick={handleVoteClick}>Votes: {votes}</button>
           <button type="button" onClick={handleCommentClick}>Comments</button>
           {err ? <p className="errormessage">{err}</p> : null}
           {viewComments? <Comments article_id={article_id}/> : null}
        </section>
    );
};

export default Article;