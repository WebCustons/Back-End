import { AppDataSource } from "../../data-source";
import { Adverts } from "../../entities/adverts.entities";
import { ImageGallery } from "../../entities/imageGallery.entities";
import { AppError } from "../../errors";
import { TImageGalleryResponse } from "../../interfaces/imageGallery.interfaces";
import { imageGallerySchemaResponse } from "../../schemas/imageGallery.schema";

export const createImgAdvertService = async (url: string, userId: number, advertId: number): Promise<TImageGalleryResponse> => {


  const advertRepository = AppDataSource.getRepository(Adverts);

  const advert = await advertRepository.findOne({
    where: { id: advertId },
  });

  if (!advert) {
    throw new AppError("Advert not found", 404);
  }
  const imageGalleryRepository = AppDataSource.getRepository(ImageGallery);

  // const newImage = imageGalleryRepository.create({
  //   image: url,
  //   advert: advert,
  // })

  // await imageGalleryRepository.save(newImage);

  // console.log(newImage);

  const newImage2 = await imageGalleryRepository.findOne({
    where: {
      id: 1
    }, relations: { adverts: true   }
  })

  console.log(newImage2);
  
  
  return imageGallerySchemaResponse.parse(newImage2);
};
