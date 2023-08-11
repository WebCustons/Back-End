import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { ImageGallery } from "../../entities/imageGallery.entities";
import { TImageGalleryResponse } from "../../interfaces/imageGallery.interfaces";
import { imageGallerySchema } from "./../../schemas/imageGallery.schema";

export const createImgAdvertService = async (
  url: string,
  userId: number,
  advertId: number
): Promise<TImageGalleryResponse> => {
  const advertRepository = AppDataSource.getRepository(Adverts);
  const advert = await advertRepository.findOne({
    where: { id: advertId, Users: { id: userId } },
  });

  if (!advert) {
    throw new Error("Advert not found");
  }

  const imageGalleryRepository = AppDataSource.getRepository(ImageGallery);
  const image = new ImageGallery();
  image.image = url;
  image.advert = advert;

  const savedImage = await imageGalleryRepository.save(image);

  return imageGallerySchema.parse(savedImage);
};
