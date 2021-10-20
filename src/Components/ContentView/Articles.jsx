import React, { useEffect, useState } from "react";
import { getArticles } from "../../utils/api";
import "../../Css/Articles.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { topic } = useParams();
  console.log(topic)
  const [sortBy, setSortBy] = useState(null)
  console.log(sortBy)
  useEffect(() => {
    getArticles({topic, sortBy})
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
      })
      .catch((err) => console.log(err, "<<<<<<<<<<"));
  }, [topic, sortBy]);

  return (
    <>
    <p className="sortby">Sort by: 
    <button type="button" onClick={ () => {setSortBy('author')}}>Author</button> 
    <button type="button" onClick={ () => {setSortBy('created_at')}}>Date</button>
    <button type="button" onClick={ () => {setSortBy('title')}}>Title</button>
    <button type="button" onClick={ () => {setSortBy('topic')}}>Topic</button>
    <button type="button" onClick={ () => {setSortBy('votes')}}>Votes</button>
    <button type="button" onClick={ () => {setSortBy('comment_count')}}>Comment Count</button>
    </p>
    <section className="articles">
      {articles.length ? (
        articles.map((article) => {
          const date = new Date(article.created_at)
          return (
            <div className="article__div" key={article.article_id}>
              <Link
                className="article--link"
                to={`/article/${article.article_id}`}
              >
                <p className="article--title">{article.title}</p>
                <p className="article--details">
                  Topic: {article.topic.toUpperCase()} Author: {article.author}{" "}
                </p>
                <p className="article--details">
                  Date posted: {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
                </p>
              </Link>
            </div>
          );
        })
      ) : (
        <p>No articles found</p>
      )}
    </section>
    </>
  );
};

export default Articles;
