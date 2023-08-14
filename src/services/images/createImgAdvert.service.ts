import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { ImageGallery } from "../../entities/imageGallery.entities";
import { AppError } from "../../errors";
import { TImageGalleryResponse } from "../../interfaces/imageGallery.interfaces";
import { advertSchemaGallery, advertSchemaRequest } from "../../schemas/advert.schema";
import { imageGallerySchema, imageGallerySchemaAdvert, imageGallerySchemaResponse } from "../../schemas/imageGallery.schema";

export const createImgAdvertService = async (url: string, advertId: number): Promise<any> => {

  const advertRepository = AppDataSource.getRepository(Adverts);

  const advert = await advertRepository.findOne({
    where: { id: advertId },
  });

  if (!advert) {
    throw new AppError("Advert not found", 404);
  }
  const imageGalleryRepository = AppDataSource.getRepository(ImageGallery);

  const newImage = imageGalleryRepository.create({
    image: url,
    adverts: advert,
  })

  await imageGalleryRepository.save(newImage);

  const image =await imageGalleryRepository.findOne({
    where: { id: newImage.id },
    relations: { adverts: true }
  })


  console.log(image)


  return imageGallerySchemaResponse.parse(image);
};
