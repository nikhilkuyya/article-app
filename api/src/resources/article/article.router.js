import { Router } from "express";
import {
  createArticle,
  getArticle,
  getArticles,
  updateArticle,
} from "./article.controller";

const router = Router();

router.route("/").get(getArticles).post(createArticle);

router.route("/:id").get(getArticle).put(updateArticle);

export default router;
