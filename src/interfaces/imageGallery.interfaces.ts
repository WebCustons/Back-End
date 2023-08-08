import { z } from "zod"
import {
  imageGallerySchema,
  imageGallerySchemaRequest,
} from "../schemas/imageGallery.schema"

export type IImageGallery = z.infer<typeof imageGallerySchema>

export type IImageGalleryRequest = z.infer<typeof imageGallerySchemaRequest>
