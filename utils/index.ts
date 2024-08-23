import { CategoryItemProps } from '../types/index';
import { products } from '../constants/index';

export const addImagesToCategories = (
  categories: string[]
): CategoryItemProps[] => {
  let catWithImages: CategoryItemProps[] = [];
  for (let i = 0; i < categories.length; i++) {
    catWithImages.push({
      name: categories[i],
      imgUrl: products[i].img,
    });
  }
  return catWithImages;
};
