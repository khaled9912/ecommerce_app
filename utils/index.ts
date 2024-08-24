import { CategoryItemProps, ProductProps } from '../types/index';
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

export const findProductsContainsSearchParams = (
  categoryProducts: ProductProps[],
  searchParams: any
) => {
  let searchTerm = searchParams?.name;
  let minPrice = searchParams?.min;
  let maxPrice = searchParams?.max;
  const result: ProductProps[] = [];
  categoryProducts.forEach((product) => {
    // Check price range if provided
    console.log(product.price, minPrice);
    const isWithinMinPrice =
      minPrice !== undefined ? product.price >= minPrice : true;
    const isWithinMaxPrice =
      maxPrice !== undefined ? product.price <= maxPrice : true;

    // Check title match if searchTerm is provided
    const titleMatches = searchTerm
      ? product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      : true;
    // Return true only if all conditions are met
    if (isWithinMinPrice && isWithinMaxPrice && titleMatches) {
      result.push(product);
    }
  });
  if (searchParams?.sort === 'asc price') {
    result.sort((a, b) => a.price - b.price);
  }
  console.log(searchParams);
  if (searchParams?.sort === 'desc price') {
    result.sort((a, b) => b.price - a.price);
  }

  return result.length > 0 ? result : categoryProducts;
};
