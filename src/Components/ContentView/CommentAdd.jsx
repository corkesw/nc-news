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
      .catch((error) => setErr('Connection error, please try again later'));
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
            maxLength='200'
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
              setCharactersLeftInForm(200)
              setErr(null)
              addingComment.reset()
            }}
          >Clear</button>
          <button type="button"
              onClick={() => {
                setAddComment(!addComment);
                commentAdded.reset()
                setCharactersLeftInForm(200)
                setErr(null)
                addingComment.reset()
              }}
            >
              Hide
            </button>
          <button className="comment--submit">Submit</button>
          <span>
          {charactersLeftInForm <= 25 ? <span className="charsleft red">{charactersLeftInForm} characters left</span> : null}
          {charactersLeftInForm <= 50 && charactersLeftInForm >25 ? <span className="charsleft amber">{charactersLeftInForm} characters left</span> : null}
          {charactersLeftInForm < 200 && charactersLeftInForm >50 ? <span className="charsleft green">{charactersLeftInForm} characters left</span> : null}
          </span>
        </form>
      ) : null}
      {addingComment.on && !err ?<p className="uploading">Uploading comment...</p> : null}
      {commentAdded.on? <p className="success">Success!</p>: null}
      {err ? (
        <p className="errormessage">{err}</p>
      ) : null}
    </>
  );
};

export default CommentAdd;
