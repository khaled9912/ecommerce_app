import { products } from '../constants/index';
import { CategoryItemProps } from '../types/index';

const PRODUCT_PER_PAGE = 20;
// START FETCHING PRODUCT
export async function fetchProducts({ limit }: { limit?: number }) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products?limit=${limit || PRODUCT_PER_PAGE}`
    );

    const result = await response.json();
    return result;
  } catch (error) {
    return { message: 'Failed to retrieve Products' };
  }
}

export async function fetchProduct(productId: number) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return { message: 'Failed to retrieve the Product' };
  }
}
// END FETCHING PRODUCT

//START FETCHING CATEGORIES
export async function fetchCategories() {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/categories`
    );

    const result = await response.json();

    return result;
  } catch (error) {
    return { message: 'Failed to retrieve categories' };
  }
}

export async function fetchCategoryProducts(categoryName: string) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${categoryName}`
    );
    const result = await response.json();

    return result;
  } catch (error) {
    return { message: 'Failed to retrieve the category' };
  }
}
// END FETCHING CATEGORIES

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
