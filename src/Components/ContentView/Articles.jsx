import React, { useEffect, useState } from "react";
import { getArticles } from "../../utils/api";
import "../../Css/Articles.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const { search } = useParams();
  console.log(search);

  useEffect(() => {
    getArticles(search)
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
      })
      .catch((err) => console.log(err, "<<<<<<<<<<"));
  }, [search]);

  return (
    <section className="articles">
      {articles.length ? (
        articles.map((article) => {
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
                  Date posted:{Date(article.created_at)}
                </p>
              </Link>
            </div>
          );
        })
      ) : (
        <p>No articles found</p>
      )}
    </section>
  );
};

export default Articles;
