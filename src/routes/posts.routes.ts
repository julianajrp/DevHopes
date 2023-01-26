import { Router } from "express";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import {
  createPostController,
  listAllPostsController,
  listPostByIdController,
  updatePostController,
  deletePostController,
  listAllCommentsFromAPostController,
} from "../controllers/posts.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import {
  postSerializer,
  postUpdateSerializer,
} from "../serializers/posts.serializers";

const postRoutes = Router();

postRoutes.post(
  "",
  validateTokenMiddleware,
  ensureDataIsValidMiddleware(postSerializer),
  createPostController
);
postRoutes.get("", validateTokenMiddleware, listAllPostsController);
postRoutes.get("/:id", validateTokenMiddleware, listPostByIdController);
postRoutes.patch(
  "/:id",
  validateTokenMiddleware,
  ensureDataIsValidMiddleware(postUpdateSerializer),
  updatePostController
);
postRoutes.delete("/:id", validateTokenMiddleware, deletePostController);
postRoutes.get("/comments/:id", listAllCommentsFromAPostController);

export default postRoutes;
