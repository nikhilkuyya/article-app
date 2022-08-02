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
  const { title, description } = req.body;
  const user = req.user;
  const article = {
    title,
    description,
    createdBy: user._id,
  };
  await Article.create(article);
  res.status(201).send({ message: "created article" });
};

export const updateArticle = async (req, res) => {
  const id = req.params.id;
  const updateArticleDetails = req.body;
  await Article.findByIdAndUpdate(id, updateArticleDetails).exec();
  res.status(204).send({ message: "updated article" });
};
