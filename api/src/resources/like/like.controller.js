import { Article } from "../article/article.model";
import { Like } from "./like.model";

export const getStatus = async (req, res) => {
  try {
    const articleQuery = req.query.article;
    const articlesIds =
      typeof articleQuery == "string" ? [articleQuery] : articleQuery || [];
    const user = req.user;
    const data = await Like.find(
      {
        article: {
          $in: articlesIds,
        },
        user: {
          $eq: user._id,
        },
      },
      { article: 1, status: 1, _id: 1 }
    ).exec();
    const response = articlesIds.map((articleId) => {
      const result = data.filter((d) => d.article == articleId);
      return {
        articleId: articleId,
        status: !!(result && result[0] && result[0].status),
        _id: result && result[0] && result[0]?._id,
      };
    });
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { article, status } = req.body;
    const user = req.user;
    const articleData = await Article.findById(article).exec();
    if (!articleData) {
      res.status(400).send({ message: "invalid arguments" });
    }
    if (articleData.createdBy.toString() === user._id.toString()) {
      return res.status(400).send({ message: " UnAuthorized" });
    }

    const statusObject = await Like.findOne({
      article: {
        $eq: article,
      },
      user: {
        $eq: user._id,
      },
    }).exec();
    if (!statusObject) {
      return res.status(400).send({ message: "Invalid input" });
    }

    const updatePayLoad = {
      status: status,
    };
    await Like.findByIdAndUpdate(id, updatePayLoad);
    return res.status(200).send({ message: "like status updated" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

export const createStatus = async (req, res) => {
  try {
    const { article, status } = req.body;
    const user = req.user;
    const articleData = await Article.findById(article).exec();
    if (!articleData) {
      res.status(400).send({ message: "invalid arguments" });
    }
    if (articleData.createdBy.toString() === user._id.toString()) {
      res.status(400).send({ message: " UnAuthorized" });
    }

    const payLoad = {
      user: user._id,
      article: article,
      status: status,
    };
    await Like.create(payLoad);
    res.status(201).send({ message: "article liked" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
