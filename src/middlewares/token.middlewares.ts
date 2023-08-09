import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from '../errors';
import { AppDataSource } from "../data-source";
import { Adverts } from "../entities/adverts.entities";
import { Users } from "../entities/users.entities";
import { Comments } from "../entities/comments.entities";
import { Repository, Entity } from 'typeorm';


export const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization;

    if (!token) {
        throw new AppError("Unauthorized: Token missing", 401);
    }

    const splitToken = token.split(" ")[1];

    Jwt.verify(
        splitToken,
        process.env.SECRET_KEY!,
        (err: any, decoded: any) => {
            if (err) {
                throw new AppError("Invalid token", 401)
            }
            res.locals.userId = decoded.sub;
            return next();
        })
};

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {

    const userId = res.locals.userId;
    const resourceId = Number(req.params.id);
    const sharedDataSource: string = req.baseUrl.replace("/", "");

    const dataSources = [
        { name: "adverts", value: Adverts },
        { name: "comments", value: Comments },
        { name: "users", value: Users }
    ];
    const resourceDataSource = dataSources.find(entity => { entity.name == sharedDataSource });

    const repository = AppDataSource.getRepository(resourceDataSource!.value);

    const resource = await repository.findOne({
        where: { id: resourceId }
    });

    if (
        (sharedDataSource !== "users" && resource!.user_ !== userId) ||
        (sharedDataSource === "users" && resource!.id !== userId)
    ) {
        throw new AppError(`This ${sharedDataSource} does not belong to you`, 401);
    }

    return next();


};

