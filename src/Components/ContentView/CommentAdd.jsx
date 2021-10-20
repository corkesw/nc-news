import React from "react";
import { useState } from "react";
import { postComments } from "../../utils/api";
import "../../Css/Articles.css";
import { useContext } from "react";
import { UserContext } from "../../Contexts/User";

const CommentAdd = ({ article_id, addComment, viewComments }) => {
  const { user } = useContext(UserContext);
  const [newCommentInput, setNewCommentInput] = useState("");
  const [newComment, setNewComment] = useState(null);
  const [err, setErr] = useState(null);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setErr(null);
    setNewComment(newCommentInput);
    postComments(newCommentInput, user, article_id)
      .then(() => {
        setNewCommentInput("");
      })
      .catch((error) => setErr(error));
  };
  return (
    <>
      {addComment ? (
        <form className="comment--form" onSubmit={handleCommentSubmit}>
          <label htmlFor="comment"></label>
          <textarea
            value={newCommentInput}
            type="text"
            id="comment"
            name="comment"
            onChange={(e) => setNewCommentInput(e.target.value)}
          />
          <button className="comment--submit">Submit</button>
        </form>
      ) : null}
      {err ? (
        <p className="errormessage">Connection error, please try again later</p>
      ) : null}
      {newComment && viewComments && !err? (
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
