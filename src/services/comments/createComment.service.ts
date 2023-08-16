import {Comments} from '../../entities/comments.entities';
import {AppDataSource} from '../../data-source';
import {TComment} from '../../interfaces/comment.interfaces';

export const createCommentsService = async(userId:number,advertId:number,comments:string):Promise<TComment>=>{

    const commentRepository = AppDataSource.getRepository(Comments);
    
    const newComments = commentRepository.create({
        comment:comments,
        user:{id:Number(userId)},
        advert:{id:advertId}
    });

    await commentRepository.save(newComments);

    const {id,comment,created_at,} = newComments;

    return{
        id,
        comment,
        user:userId,
        advert:advertId,
        created_at
    }
    
}