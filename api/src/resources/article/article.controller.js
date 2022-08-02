import { Article } from "./article.model";

export const getArticles = async (req, res) => {
  const articles = await Article.find({}).exec();
  res.status(200).send(articles);
};

export const getArticle = async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id).exec();
  return res.status(200).send(article);
};

export const createArticle = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user;
    const article = {
      title,
      description,
      createdBy: user._id,
    };
    await Article.create(article);
    return res.status(201).send({ message: "created article" });
  } catch (er) {
    return res.status(500).send({ message: er.message });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const updateArticleDetails = req.body;
    const user = req.user;
    const article = await Article.findById(id).exec();
    if (user.userId !== article.user) {
      return res.status(401).send({ message: "unauthorized" });
    }
    const payLoad = {
      title: updateArticleDetails.title || article.title,
      description: updateArticleDetails.description || article.description,
    };
    await Article.updateOne(payLoad).exec();
    res.status(204).send({ message: "updated article" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
