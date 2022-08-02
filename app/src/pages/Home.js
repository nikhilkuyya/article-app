import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { FetchContext } from "../context/FetchProvider";

export const Home = () => {
  const { authState } = useContext(AuthContext);
  const userId = authState.userInfo._id;
  const { authAxios } = useContext(FetchContext);
  const [articles, setArticles] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [articleLike, setTriggerArticleLike] = useState({
    articleId: null,
    status: false,
  });

  useEffect(() => {
    async function getStatus(articles) {
      const query = articles.reduce((acc, id, index, list) => {
        const join = index == 0 ? "?" : index < list.length ? "&" : "";
        return `${acc}${join}article=${id}`;
      }, "");
      return await authAxios.get(`/api/like${query}`);
    }
    if (articles.length > 0) {
      getStatus(articles.map(({ _id }) => _id))
        .then((likes) => {
          setStatusList(likes);
        })
        .catch((err) => {
          setStatusList([]);
          console.log(err);
        });
    } else {
      setStatusList([]);
    }
  }, [articles]);

  useEffect(() => {
    authAxios
      .get("/api/article")
      .then((data) => {
        setArticles(data);
        return data;
      })
      .catch((err) => {
        setArticles([]);
        console.log(err);
      });
  }, []);

  function getLikeStatus(articleId) {
    const statusObject = statusList.find(({ articleId: aId }) => {
      return aId == articleId;
    });
    return statusObject ? statusObject?.status : false;
  }

  useEffect(() => {
    async function modifyStatus(data) {
      await authAxios.put(`/api/like/${data.id}`, {
        id: data.id,
        article: data.article,
        status: data.status,
      });
    }
    async function createStatus(data) {
      await authAxios.post(`/api/like`, {
        article: data.article,
        status: data.status,
      });
    }

    if (articleLike && articleLike.articleId) {
      const likeData = statusList.find(
        (statusItem) => statusItem.articleId === articleLike.articleId
      );
      if (likeData && likeData._id) {
        modifyStatus({
          id: likeData._id,
          article: articleLike.articleId,
          status: articleLike.status,
        }).then(() => {
          setArticles(articles.map((d) => d));
        });
      } else {
        createStatus({
          article: articleLike.articleId,
          status: articleLike.status,
        }).then(() => {
          setArticles(articles.map((d) => d));
        });
      }
    }
  }, [articleLike]);
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
          <div key={article._id}>
            <article key={article._id} className="vt">
              <header className="hf">
                <h5>{article.title}</h5>
                <div>
                  {userId === article?.createdBy ? (
                    <Link to={`/article/${article._id}`} state={article}>
                      Edit
                    </Link>
                  ) : (
                    <button
                      type="button"
                      data-value={getLikeStatus(article._id)}
                      onClick={(evt) => {
                        const status = evt.target.dataset.value == "true";
                        setTriggerArticleLike({
                          articleId: article._id,
                          status: !status,
                        });
                      }}
                    >
                      {getLikeStatus(article._id) ? "UnLike" : "Like"}
                    </button>
                  )}
                </div>
              </header>
              <p>{article.description}</p>
            </article>
            <hr />
          </div>
        );
      })}
    </>
  );
};
