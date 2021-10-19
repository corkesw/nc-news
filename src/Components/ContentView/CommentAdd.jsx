import React from "react";
import { useState } from "react";
import { postComments } from "../../utils/api";

const CommentAdd = ({user, article_id, addComment, viewComments}) => {
    
    const [newCommentInput, setNewCommentInput] = useState('')
    const [newComment, setNewComment] = useState(null)
    
    const handleCommentSubmit = (e) => {
        e.preventDefault()
        setNewComment(newCommentInput);
        postComments(newCommentInput, user, article_id)
        .catch(err => console.dir(err, '<<<<<<<<'))
      }
  return (
    <>
      {addComment ? (
        <form onSubmit={handleCommentSubmit}>
          <label htmlFor="comment">Comment</label>
          <input
            value={newCommentInput}
            type="text"
            id="comment"
            name="comment"
            onChange={(e) => setNewCommentInput(e.target.value)}
          />
          <button>submit</button>
        </form>
      ) : null}
      
      {newComment && viewComments ? (
        <>
          <p>{newComment}</p>
          <p>by {user}</p>
          <p>Just now!</p>
        </>
      ) : null}
    </>
  );
};

export default CommentAdd;
