import {Request,Response} from 'express';
import {readAllCommentAdvertService} from '../../services/comments/readAllCommentAdvert.service';


export const readAllCommentAdvertController = async(req:Request, res:Response)=>{

    const result = await readAllCommentAdvertService(Number(req.params.id));

    return res.status(200).json(result);

}