import { AppDataSource } from "../../data-source";
import { ImageGallery } from "../../entities/imageGallery.entities";

export const deleteImgAdvertService = async (
  imageId: number
): Promise<void> => {
  const imageRepository = AppDataSource.getRepository(ImageGallery);

  const image = await imageRepository.findOne({
    where: { id: imageId },
  });

  if (!image) {
    throw new Error("Image not found");
  }

  await imageRepository.remove(image);
};
