import React, { useEffect, useState } from "react";
import { getArticles } from "../../utils/api";
import "../../Css/Articles.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useLoading } from "../../hooks/useLoading";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("asc");
  const [totalArticles, setTotalArticles] = useState(null);
  const { on, loading, reset } = useLoading();
  const [page, setPage] = useState(1);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setErr(false);
    loading(true);
    getArticles({ topic, sortBy, order, page })
      .then((articlesFromApi) => {
        setArticles(articlesFromApi.articles);
        setTotalArticles(articlesFromApi.total_count);
        reset();
        if (articlesFromApi.articles.length === 0) {
          setPage(1);
        }
      })
      .catch((err) => setErr("Connection error!"));
  }, [topic, sortBy, order, page, loading]); //don't add reset!

  return (
    <>
      {on && !err ? (
        <div className="spinner articlespinner">
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : null}
      {err ? <p className="errormessage errorcentre">{err}</p> : null}
      <p className="sortby">
        Sort :
        <button
          className={`sortauthor ${sortBy} styledbutton`}
          type="button"
          onClick={() => {
            setSortBy("author");
            setPage(1);
          }}
        >
          Author
        </button>
        <button
          className={`sortcreated_at ${sortBy} styledbutton`}
          type="button"
          onClick={() => {
            setSortBy("created_at");
            setPage(1);
          }}
        >
          Date
        </button>
        <button
          className={`sorttitle ${sortBy} styledbutton`}
          type="button"
          onClick={() => {
            setSortBy("title");
            setPage(1);
          }}
        >
          Title
        </button>
        {!topic ? (
          <button
            className={`sorttopic ${sortBy} styledbutton`}
            type="button"
            onClick={() => {
              setSortBy("topic");
              setPage(1);
            }}
          >
            Topic
          </button>
        ) : null}
        <button
          className={`sortvotes ${sortBy} styledbutton`}
          type="button"
          onClick={() => {
            setSortBy("votes");
            setPage(1);
          }}
        >
          Votes
        </button>
        <button
          className={`sortcomment_count ${sortBy} styledbutton`}
          type="button"
          onClick={() => {
            setSortBy("comment_count");
            setPage(1);
          }}
        >
          Comments
        </button>
        <span className="order__span">
          Order:
          {order === "desc" ? (
            <button
              className="order__button"
              type="button"
              onClick={() => {
                setOrder("asc");
              }}
            >
              Desc
            </button>
          ) : null}
          {order !== "desc" ? (
            <button
              className="order__button"
              type="button"
              onClick={() => {
                setOrder("desc");
              }}
            >
              Asc
            </button>
          ) : null}
        </span>
      </p>

      <section className="articles">
        {articles.length ? (
          articles.map((article) => {
            const date = new Date(article.created_at);
            return (
              <Link
                className="article--link"
                to={`/article/${article.article_id}`}
                key={article.article_id}
              >
                <div className="article__div">
                  <p className="article--title">{article.title}</p>
                  <p className="article--details">
                    Topic: {article.topic.toUpperCase()} Author:{" "}
                    {article.author}{" "}
                  </p>
                  <p className="article--details">
                    Date posted:{" "}
                    {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
                    <span className="desktop">
                      {" "}
                      Votes: {article.votes} Comments: {article.comment_count}
                    </span>
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <p>No articles found</p>
        )}
      </section>
      {articles.length > 0 ? (
        <p className="pagination">
          <button
            className="styledbutton"
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
            disabled={page <= 1}
          >
            Back
          </button>{" "}
          Page {page}{" "}
          <button
            className="styledbutton"
            onClick={() => {
              setPage((currPage) => currPage + 1);
            }}
            disabled={page * 10 > totalArticles}
          >
            Forward
          </button>
        </p>
      ) : null}
    </>
  );
};

export default Articles;
