import { useContext, useEffect, useState } from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import { FetchContext } from "./../context/FetchProvider";

const Article = (props) => {
  const { heading } = props;
  const { id } = useParams();
  const { state } = useLocation();
  const [article, setArticle] = useState(state || {});
  const [isSubmitted, setSubmitState] = useState(false);
  const [title, setTitle] = useState(article?.title || "");
  const [description, setDescription] = useState(article?.description || "");
  const { authAxios } = useContext(FetchContext);
  const [redirected, setRedirect] = useState(false);

  useEffect(() => {
    async function createArticle() {
      return await authAxios.post("/api/article", {
        title,
        description,
      });
    }
    async function updateArticle() {
      return await authAxios.put(`/api/article/${article._id}`, {
        title,
        description,
      });
    }
    if (isSubmitted) {
      Promise.all([id ? updateArticle() : createArticle()])
        .then(() => {
          setRedirect(true);
        })
        .catch((err) => {
          console.error(err);
          setSubmitState(false);
        });
    }
  }, [isSubmitted]);

  return (
    <>
      <h4>
        {heading} - {id ? article.title || "" : "New"}
      </h4>
      <form
        className="vt"
        onSubmit={(evt) => {
          evt.preventDefault();
          setSubmitState(true);
        }}
      >
        <label htmlFor="articleTitle">
          Title
          <input
            type="text"
            id="articleTitle"
            name="title"
            value={title}
            required
            onChange={(evt) => {
              setTitle(evt.target.value);
            }}
          />
        </label>
        <label htmlFor="articleDescription">
          Description
          <textarea
            id="articleDescription"
            name="description"
            required
            value={description}
            onChange={(evt) => {
              setDescription(evt.target.value);
            }}
          />
        </label>
        <div>
          <button type="submit">
            {id ? "Update Article" : "Create Article"}
          </button>
          <button type="button">Clear</button>
        </div>
      </form>
      {redirected && <Navigate to="/home" />}
    </>
  );
};

export default Article;
