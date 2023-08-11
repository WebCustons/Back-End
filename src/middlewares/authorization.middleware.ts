import { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"
import "dotenv/config"
import { AppError } from "../errors"
import { AppDataSource } from "../data-source"
import { Users } from "../entities/users.entities"
import { ImageGallery } from './../entities/imageGallery.entities';
export const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization

    if (!token) {
        throw new AppError("Unauthorized: Token missing", 401)
    }
    const splitToken = token.split(" ")[1]

    Jwt.verify(
        splitToken,
        process.env.SECRET_KEY!,
        (err: any, decoded: any) => {
            if (err) {
                throw new AppError("Invalid token", 401);
            }
            res.locals.userId = decoded.subject;
            return next();
        }
    );
};

export const isResourceOwner = (resource: any, userId: number) => {
    if (resource && resource.user) {
        return resource.user.id === userId;
    } else if (resource.advert.user.id) {
        return resource.advert.user.id === userId;
    }

}

export const isOwner = (entity: any) => async (req: Request, res: Response, next: NextFunction) => {

    const userId = res.locals.userId;
    const resourceId = Number(req.params.id);

    const repository = AppDataSource.getRepository(entity);

    const resourceQuery = {
        where: {
            id: resourceId
        }
    };

    if (entity !== Users && entity !== ImageGallery) {
        Object.assign(resourceQuery, { relations: ["user"] });
    } else if (entity === ImageGallery) {
        Object.assign(resourceQuery, { relations: ["advert", "advert.user"] });
    }

    const resource = await repository.findOne(resourceQuery);

    
    if (!resource || !isResourceOwner(resource, userId)) {
        throw new AppError(`This ${entity} does not belong to you`, 401);
    }

    return next();
};

export const isAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = res.locals.userId

    const repository = AppDataSource.getRepository(Users)

    const user = await repository.findOne({
        where: { id: userId }
    });

    if (user!.type_user !== "admin") {
        throw new AppError(`You are not an admin`, 401)
    }

    return next()
}

export const isOwnerOrAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = res.locals.userId
    const resourceId = Number(req.params.id)
    const sharedDataSource: string = req.baseUrl.replace("/", "")

    const repository = AppDataSource.getRepository(Users)

    const user = await repository.findOne({
        where: { id: userId }
    });


    if (user?.type_user === "admin" || isResourceOwner(resourceId, userId)) {
        return next()
    }

    throw new AppError(`This ${sharedDataSource} does not belong to you`, 401)
}
