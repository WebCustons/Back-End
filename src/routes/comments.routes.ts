import { Router, Request, Response} from "express";
import {createCommentsService} from '../services/comments/createComment.service';
import {verifyAuthToken} from '../middlewares/authorization.middleware';
import {advertsExistsbyId} from '../middlewares/adverts.middlewares';

export const commentsRoutes = Router()

commentsRoutes.post("/:id", verifyAuthToken, advertsExistsbyId,async(req:Request, res:Response)=>{

    const result = await createCommentsService(res.locals.userId, Number(req.params.id), req.body.comments);

    return res.json(result)
})
commentsRoutes.get("/:id")
commentsRoutes.patch("/:id")
commentsRoutes.delete("/:id")
