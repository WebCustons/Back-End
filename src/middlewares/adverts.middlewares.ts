import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Adverts } from "../entities/adverts.entities";
import { AppError } from './../errors';

export const isOwnerAdverts = async (req: Request, res: Response, next: NextFunction) => {

    const userId = Number(res.locals.userId)
    const advertsId = Number(req.params.id)
    const method = String(req.method)
    const repository = AppDataSource.getRepository(Adverts)


    const adverts = await repository.findOne({
        where: { id: advertsId },
        relations: { user: true }
    });
    
    if ((method !== "POST") && adverts?.user.id == userId) {
        return next()
    }

    throw new AppError(`This does not belong to you`, 401)
}

export const advertsExistsbyId = async (req: Request, res: Response, next: NextFunction) => {

    const id = parseInt(req.params.id)

    const userRepository = AppDataSource.getRepository(Adverts);

    const existingUser = await userRepository.findOne({
        where: [{ id }],
    });

    if (!existingUser) {
        throw new AppError("This advert is not exists", 409);
    }

    return next();
};