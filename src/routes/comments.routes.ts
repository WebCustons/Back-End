import { Router } from "express"

export const commentsRoutes = Router()

commentsRoutes.post("/:id")
commentsRoutes.get("/:id")
commentsRoutes.patch("/:id")
commentsRoutes.delete("/:id")
