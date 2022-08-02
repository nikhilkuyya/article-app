import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { FetchContext } from "../context/FetchProvider";

export const Home = () => {
  const { authState } = useContext(AuthContext);
  const userId = authState.userInfo._id;
  const { authAxios } = useContext(FetchContext);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    authAxios
      .get("/api/article")
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => {
        setArticles([]);
      });
  }, []);
  console.log("data", userId, articles);
  return (
    <>
      <div className="hf">
        <h2>Articles</h2>
        <nav>
          <Link to="/article/new">Create New </Link>
        </nav>
      </div>

      {articles.map((article) => {
        return (
          <article key={article._id} className="vt">
            <header className="hf">
              <h5>{article.title}</h5>
              <div>
                {userId === article?.createdBy ? (
                  <Link to={`/article/${article._id}`} state={article}>
                    Edit
                  </Link>
                ) : (
                  <button type="button">Like</button>
                )}
              </div>
            </header>
            <p>{article.description}</p>
          </article>
        );
      })}
    </>
  );
};
