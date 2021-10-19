import React, { useEffect, useState } from 'react';
import { getComments } from '../../utils/api';
import Comment from "../../Components/ContentView/Comment"

const Comments = ({article_id, setViewComments}) => {
    
    const [comments, setComments] = useState([])
    const [err, setErr] = useState(null)
    
    useEffect( () => {
        getComments(article_id)
        .then((commentsFromApi) => {
            setComments(commentsFromApi)
        }).catch((error) => {
            setErr('Something went wrong, please try again later')
        })
    }, [])

    return (
        comments.map((comment) => {
            return <div className="comment" key={comment.comment_id}>
                <p>{comment.body}</p>
                <p>by {comment.author}</p>
                <p>on {`${new Date(comment.created_at).getDate()}/${new Date(comment.created_at).getMonth()+1}/${new Date(comment.created_at).getFullYear()}`}</p>
                <Comment comment_id={comment.comment_id} votesPassed={comment.votes} setViewComments={setViewComments}/>
                <br />
            </div>
        })
       
    );
};

export default Comments;