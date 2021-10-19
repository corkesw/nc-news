import React, { useState } from 'react';
import useVotes from '../../hooks/useVotes';
import { incVote } from '../../utils/api';



const Comment = ({comment_id, votesPassed, setViewComments}) => {
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

    return (
        <>
        <button onClick={handleClick} type="button" >Votes: {votes}</button>
        <button onClick={() => {setViewComments(false)}}>Hide comments</button>
        {err? <p className="errormessage">{err}</p> : null}
        </>
    );
};

export default Comment;