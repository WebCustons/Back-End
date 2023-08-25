import { TComment } from "../../interfaces/comment.interfaces";
import { createCommentsService } from "../../services/comments/createComment.service";
import {Request, Response} from 'express';

export const createCommentController =  async (req: Request, res: Response) => {

    const result = await createCommentsService(res.locals.userId,Number(req.params.id),req.body.comment);

    return res.json(result).status(201);
}