import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { ImageGallery } from "../../entities/imageGallery.entities";
import {
  TImageGalleryRequest,
  TImageGalleryResponse,
} from "../../interfaces/imageGallery.interfaces";
import { imageGallerySchemaResponse } from './../../schemas/imageGallery.schema';

export const updateImgAdvertService = async (id: number, img: string): Promise<TImageGalleryResponse> => {

  const imageRepository = AppDataSource.getRepository(ImageGallery);

  const image = await imageRepository.findOne({
    where: { id: id },
  });

  if (!image) {
    throw new Error("Image not found");
  }

  const updatedImage = Object.assign(image, img);

  await imageRepository.save(updatedImage);

  const newImage = await imageRepository.findOne({
    where: { id: id },
    relations: { adverts: true },
  });
  console.log(newImage);

  return imageGallerySchemaResponse.parse(newImage);
};
