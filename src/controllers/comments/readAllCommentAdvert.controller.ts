import {Request,Response} from 'express';
import {readAllCommentAdvertService} from '../../services/comments/readAllCommentAdvert.service';
import { commentSchemaReadAllCommentAdvert, commentSchemaResponse } from '../../schemas/comment.schema';


export const readAllCommentAdvertController = async(req:Request, res:Response)=>{

    const result = await readAllCommentAdvertService(Number(req.params.id));
    console.log(result);
    const verify = commentSchemaReadAllCommentAdvert.parse(result);

    return res.status(200).json(verify);

}