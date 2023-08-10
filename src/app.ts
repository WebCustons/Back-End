import "express-async-errors"
import express from "express"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import cors from "cors"
import { handleAppError } from "./errors"
import { userRoutes } from "./routes/users.routes"
import { advertsRoutes } from "./routes/adverts.routes"
import { imageGalleryRoutes } from "./routes/imageGallery.routes"
import { commentsRoutes } from "./routes/comments.routes"
import { loginRoutes } from "./routes/login.routes"

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: "http://localhost:5173",
  })
)

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Web Customs API",
      version: "1.0.0",
      description: "API Documentation for Web Customs",
    },
    basePath: "http://localhost:3000/api-docs",
  },
  apis: ["src/routes/*.ts"],
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// Configurações para documentação

//Rotas


app.use("/login", loginRoutes)
app.use("/users", userRoutes)
app.use("/adverts", advertsRoutes)
// app.use("/adverts", imageGalleryRoutes)
app.use("/comments", commentsRoutes)

app.use(handleAppError)

export default app
