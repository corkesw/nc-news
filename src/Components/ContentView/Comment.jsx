import React, { useState } from "react";
import { deleteComment, incVote } from "../../utils/api";

const Comment = ({
  setCommentChange,
  comment_id,
  votesPassed,
  setViewComments,
  author,
  user
}) => {
  const [votes, setVotes] = useState(votesPassed);
  const [err, setErr] = useState(null);
  const [deletedTrue, setDeletedTrue] = useState(false);

  const handleClick = () => {
    setVotes((currVotes) => currVotes + 1);
    setErr(null);
    incVote("comments", comment_id).catch((error) => {
      setVotes((currVotes) => currVotes - 1);
      setErr("Connection error, please try again later");
    });
  };

  const handleDelete = () => {
    deleteComment(comment_id)
      .then(() => {
        setDeletedTrue(true);
        setCommentChange(true);
      })
      .catch((error) => {
        setErr("Connection error, delete unsuccessful");
      });
  };

  return (
    <div className={`deleted${deletedTrue}`}>
      <button
        disabled={deletedTrue === true}
        onClick={handleClick}
        type="button"
      >
        Votes: {votes}
      </button>
      <button
        disabled={deletedTrue === true}
        onClick={() => {
          setViewComments(false);
        }}
      >
        Hide comments
      </button>
      {author === user ? (
        <button
          disabled={deletedTrue === true}
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      ) : null}
      {err ? <p className="uploading">{err}</p> : null}
      {deletedTrue ? <p>Deleting...</p> : null}
    </div>
  );
};

export default Comment;
