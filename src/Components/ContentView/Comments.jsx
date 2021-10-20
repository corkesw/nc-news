import React, { useEffect, useState } from 'react';
import { getComments } from '../../utils/api';
import Comment from "../../Components/ContentView/Comment"
import { useContext } from 'react';
import { UserContext } from '../../Contexts/User';

const Comments = ({article_id, setViewComments, viewComments}) => {
    const {user} = useContext(UserContext)
    const [comments, setComments] = useState([])
    const [err, setErr] = useState(null)
    
    useEffect( () => {
        setErr(null)
        getComments(article_id)
        .then((commentsFromApi) => {
            setComments(commentsFromApi)
        }).catch((error) => {
            setViewComments((currView) => {
                return false
            })
            setErr('Something went wrong, please try again later')
        })
    }, [])

    return (
        <>
        {err && viewComments ? <p className="errormessage">{err}</p> : null }

        {viewComments ? 
         comments.map((comment) => {
        return <div className="comment" key={comment.comment_id}>
            <p>{comment.body}</p>
            <p className="article--details">by {comment.author}</p>
            <p className="article--details">on {`${new Date(comment.created_at).getDate()}/${new Date(comment.created_at).getMonth()+1}/${new Date(comment.created_at).getFullYear()}`}</p>
            <Comment user={user} comment_id={comment.comment_id} votesPassed={comment.votes} setViewComments={setViewComments} author={comment.author}/>
            <hr />
        </div>
    }) : null    
    }
       
    
    </>
    );
};

export default Comments;