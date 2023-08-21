import { Router} from "express";
import { notIsAdmin, verifyAuthToken } from "../middlewares/authorization.middleware";
import { advertsExistsbyId} from "../middlewares/adverts.middlewares";
import { createCommentController } from "../controllers/comments/createComment.controller";
import { readAllCommentAdvertController } from "../controllers/comments/readAllCommentAdvert.controller";
import { deleteCommentController } from "../controllers/comments/deleteComment.controller";
import { commentExistsbyId, isOwnerOrAdminComments} from "../middlewares/comments.middlewares";
import { updateCommentController } from "../controllers/comments/updateComment.controller";
import { schemaValidator } from "../middlewares/schema.middlewares";
import { commentSchemaRequest } from "../schemas/comment.schema";

export const commentsRoutes = Router();

commentsRoutes.post(
  "/advert/:id/",
  verifyAuthToken,
  advertsExistsbyId,
  notIsAdmin,
  schemaValidator(commentSchemaRequest),
  createCommentController
);
commentsRoutes.get("/advert/:id",verifyAuthToken,advertsExistsbyId,readAllCommentAdvertController);
commentsRoutes.patch("/:id",verifyAuthToken,commentExistsbyId,isOwnerOrAdminComments,schemaValidator(commentSchemaRequest),updateCommentController);
commentsRoutes.delete("/:id", verifyAuthToken,commentExistsbyId,isOwnerOrAdminComments,deleteCommentController);
