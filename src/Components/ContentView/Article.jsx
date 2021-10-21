import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticle, incVote } from "../../utils/api";
import "../../Css/Articles.css";
import Comments from "./Comments";
import CommentAdd from "./CommentAdd";
import { useLoading } from "../../hooks/useLoading";

const Article = ({ user }) => {
  const [article, setArticle] = useState([]); // selected article
  const { article_id } = useParams(); // selected article id
  const [votes, setVotes] = useState(); // votes for selected article
  const [err, setErr] = useState(null); // error state if vote fails
  const [loadErr, setLoadErr] = useState(false);
  const [viewComments, setViewComments] = useState(false); // toggle between comment view and change text on comment button : Comments / Hide comments
  const [addComment, setAddComment] = useState(false); //toggle comment box open/closed
  const { on, loading, reset } = useLoading();
  const [commentChange, setCommentChange] = useState(false); // update if comment added or deleted
  const commentAdded = useLoading();

  useEffect(() => {
    loading(true);
    setLoadErr(false);
    getArticle(article_id)
      .then((articleFromApi) => {
        const topic = articleFromApi.topic.toUpperCase();
        articleFromApi.topic = topic;
        setArticle(articleFromApi);
        setVotes(articleFromApi.votes);
        reset();
      })
      .catch((error) => {
        if (error) {
          setLoadErr("Article not found");
          reset();
        }
      });
  }, [article_id, loading]); // don't add reset!

  const handleVoteClick = () => {
    setVotes((currVotes) => currVotes + 1);
    setErr(null);
    incVote("articles", article_id).catch((error) => {
      setVotes((currVotes) => currVotes - 1);
      setErr("Connection error, please try again later");
    });
  };

  const handleCommentClick = () => {
    setViewComments((currView) => {
      return !currView;
    });
  };

  return (
    <>
      {loadErr ? (
        <p className="errormessage errorcentre">Article not found</p>
      ) : (
        <>
          {on ? (
            <div className="spinner">
              <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <section className="article__div">
              <p className="article--title">{article.title}</p>
              <p className="article--details">
                Topic: {article.topic} Author: {article.author}
              </p>
              <p className="article--details">
                Date posted:{" "}
                {`${new Date(article.created_at).getDate()}/${
                  new Date(article.created_at).getMonth() + 1
                }/${new Date(article.created_at).getFullYear()}`}
              </p>
              <p>{article.body}</p>
              <button type="button" onClick={handleVoteClick}>
                Votes: {votes}
              </button>

              {viewComments ? (
                <button type="button" onClick={handleCommentClick}>
                  Hide Comments
                </button>
              ) : (
                <button type="button" onClick={handleCommentClick}>
                  Comments
                </button>
              )}

              {!addComment ? (
                <button
                  onClick={() => {
                    setAddComment(true);
                    commentAdded.reset();
                  }}
                >
                  Add comment
                </button>
              ) : null}
              {err ? <p className="errormessage comment">{err}</p> : null}
              <CommentAdd
                user={user}
                article_id={article_id}
                addComment={addComment}
                viewComments={viewComments}
                commentChange={commentChange}
                setCommentChange={setCommentChange}
                setViewComments={setViewComments}
                commentAdded={commentAdded}
                setAddComment={setAddComment}
              />

              <Comments
                user={user}
                article_id={article_id}
                setViewComments={setViewComments}
                viewComments={viewComments}
                commentChange={commentChange}
                setCommentChange={setCommentChange}
              />
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Article;
