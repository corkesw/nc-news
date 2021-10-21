import React from "react";
import { useState } from "react";
import { postComments } from "../../utils/api";
import "../../Css/Articles.css";
import { useContext } from "react";
import { UserContext } from "../../Contexts/User";
import { useLoading } from "../../hooks/useLoading";


const CommentAdd = ({ setAddComment, commentAdded, article_id, addComment, viewComments, commentChange, setCommentChange, setViewComments }) => {
  const { user } = useContext(UserContext);
  const [newCommentInput, setNewCommentInput] = useState("");
  const [err, setErr] = useState(null);
  const [charactersLeftInForm, setCharactersLeftInForm] = useState(200)
  const addingComment = useLoading()
  


  const handleCommentSubmit = (e) => {
    commentAdded.reset()
    addingComment.loading(true)
    e.preventDefault();
    setErr(null);
    postComments(newCommentInput, user, article_id)
      .then(() => {
        setNewCommentInput("");
        setCommentChange(true)
        addingComment.reset()
        commentAdded.loading(true)
        setViewComments(true)
      })
      .catch((error) => setErr(error));
  };
  return (
    <>
      {addComment ? (
        <form className="comment--form" onSubmit={handleCommentSubmit}>
          <label htmlFor="comment"></label>
          <textarea
            required
            placeholder="max 200 chars"
            value={newCommentInput}
            type="text"
            maxlength='200'
            id="comment"
            name="comment"
            onChange={
              (e) => {
                setNewCommentInput(e.target.value)
                setCharactersLeftInForm(200 - e.target.value.length)
                commentAdded.reset()
              }
            }
          />
          <button
            onClick={(e) => {
              setNewCommentInput('')
            }}
          >Clear</button>
          <button
              onClick={() => {
                setAddComment(!addComment);
                commentAdded.reset()
              }}
            >
              Hide
            </button>
          <button className="comment--submit">Submit</button>
          <span>{charactersLeftInForm} characters left</span>
        </form>
      ) : null}
      {addingComment.on && !err ?<p className="uploading">Uploading comment...</p> : null}
      {commentAdded.on? <p className="success">Success!</p>: null}
      {err ? (
        <p className="errormessage">Connection error, please try again later</p>
      ) : null}
    </>
  );
};

export default CommentAdd;
