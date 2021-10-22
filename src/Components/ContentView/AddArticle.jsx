import React, { useEffect, useState } from "react";
import axios from "axios";
import { Hint } from "react-autocomplete-hint";
import "../../Css/Articles.css";
import { getTopics } from "../../utils/api";

function AddArticle() {
  const [hintData, setHintData] = useState([]);
  const [topicText, setTopicText] = useState("");

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
        <form className="article__form">
          <label class="topiclabel" htmlFor="topic">Topic</label>
          <Hint class ="topicinput" id="topic" options={hintData} allowTabFill>
            <input
              className="input-with-hint"
              value={topicText}
              onChange={(e) => setTopicText(e.target.value)}
            />
          </Hint>
          <label className="titlelabel" htmlFor="title">Title</label>
          <input className="titleinput" id="title" type="text" />
          <label className="articlelabel" htmlFor="article">Article</label>
          <textarea className="articleinput" id="article" type="text" />
          
        </form>
      </section>
    </>
  );
}

export default AddArticle;


