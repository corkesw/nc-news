import React, { useEffect, useState } from "react";
import axios from "axios";
import { Hint } from "react-autocomplete-hint";
import "../../Css/Articles.css";
import { getTopics } from "../../utils/api";

function AddArticle() {
  const [hintData, setHintData] = useState([]);
  const [text, setText] = useState("");

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
          <label htmlFor="topic">Topic</label>
          <Hint id="topic" options={hintData} allowTabFill>
            <input
              className="input-with-hint"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Hint>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" />
        </form>
      </section>
    </>
  );
}

export default AddArticle;
