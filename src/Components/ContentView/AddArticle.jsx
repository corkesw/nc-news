import React, { useEffect, useState } from "react";
import axios from "axios";
import { Hint } from "react-autocomplete-hint";
import "../../Css/Articles.css";
import { getTopics } from "../../utils/api";
import { useLoading } from "../../hooks/useLoading";
import { postArticle } from "../../utils/api.js";
import { useContext } from "react";
import { UserContext } from "../../Contexts/User";
import { Link } from "react-router-dom";

function AddArticle() {
  const [hintData, setHintData] = useState([]);
  const [topicText, setTopicText] = useState("");
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [err, setErr] = useState(null);
  const { user } = useContext(UserContext);

  const addingArticle = useLoading();
  const articleAdded = useLoading();

  const handleArticleSubmit = (e) => {
    articleAdded.reset();
    addingArticle.loading(true);
    e.preventDefault();
    setErr(null);
    postArticle(user, topicText, titleText, bodyText)
      .then(() => {
        setTopicText("");
        setTitleText("");
        setBodyText("");
        addingArticle.reset();
        articleAdded.loading(true);
      })
      .catch((error) => setErr("Connection error, please try again later"));
  };

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      const topics = topicsFromApi.map((topic) => {
        return topic.slug;
      });
      setHintData(topics);
    });
  }, []);

  return (
    <>
      <section className="article__div">
        <p className="article--title">Add article</p>
        {user ?
        <form className="article__form" onSubmit={handleArticleSubmit}>
          <label className="topiclabel" htmlFor="topic">
            Topic
          </label>
          <Hint
            className="topicinput"
            id="topic"
            options={hintData}
            allowTabFill
          >
            <input
              required
              className="input-with-hint"
              value={topicText}
              onChange={(e) => setTopicText(e.target.value)}
            />
          </Hint>
          <label className="titlelabel" htmlFor="title">
            Title
          </label>
          <input
            required
            className="titleinput"
            id="title"
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
          />
          <label className="articlelabel" htmlFor="article">
            Article
          </label>
          <textarea
            required
            className="articleinput"
            id="article"
            type="text"
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          />
          <span className="addarticlespacer"></span>
          <button className="articlesubmit">Submit</button>
        </form>
        : 
        <p className="nologin">Please <Link className="nologin"to="/login">login</Link> to add an article</p>
        }
      </section>
    </>
  );
}

export default AddArticle;
