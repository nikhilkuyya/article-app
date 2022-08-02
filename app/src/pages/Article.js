import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const Article = (props) => {
  const { heading } = props;
  const { id } = useParams();
  const { state } = useLocation();
  const [article, setArticle] = useState(state);

  return (
    <>
      <h4>
        {heading} - {id ? article?.title || "" : "New"}
      </h4>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
        }}
      >
        <label htmlFor="articleTitle">
          Title
          <input
            id="articleTitle"
            name="title"
            value={article?.title}
            onChange={(evt) => {
              setArticle({ ...article, title: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="articleDescription">
          Title
          <input
            id="articleDescription"
            name="description"
            value={article?.description}
            onChange={(evt) => {
              setArticle({ ...article, description: evt.target.value });
            }}
          />
        </label>
        <div>
          <button type="submit">
            {id ? "Create Article" : "Update Article"}
          </button>
          <button type="button">Clear</button>
        </div>
      </form>
    </>
  );
};

export default Article;
