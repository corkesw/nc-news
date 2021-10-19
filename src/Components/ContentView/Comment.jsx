import React, { useState } from 'react';
import { incVote } from '../../utils/api';



const Comment = ({comment_id, votesPassed, setViewComments, author, user}) => {
    const [votes, setVotes] = useState(votesPassed)
    const [err, setErr] = useState(null)
   
    const handleClick = () => {
        setVotes((currVotes) => currVotes +1)
        setErr(null)
        incVote('comments', comment_id)
        .catch((error) => {
            setVotes((currVotes) => currVotes -1)
            setErr('Connection error, please try again later')
        })
    }

    const handleDelete = () => {
        
    }

    return (
        <>
        <button onClick={handleClick} type="button" >Votes: {votes}</button>
        <button onClick={() => {setViewComments(false)}}>Hide comments</button>
        {author === user ? <button type="button" onClick={handleDelete}>Delete</button> : null}
        {err? <p className="errormessage">{err}</p> : null}

        </>
    );
};

export default Comment;