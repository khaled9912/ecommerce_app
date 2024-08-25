import { CategoryItemProps, ProductProps } from '../types/index';
import { products } from '../constants/index';

// START FETCHING PRODUCT

const PRODUCT_PER_PAGE = 20;

export async function fetchProducts(limit?: number) {
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

export async function fetchProduct(productId: string) {
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

export async function fetchCategoryProducts(
  limit?: number,
  categoryName?: string
) {
  try {
    if (categoryName) {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${categoryName}`
      );
      const result = await response.json();

      return result;
    }
    return await fetchProducts(limit);
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
  if (searchParams?.sort === 'desc price') {
    result.sort((a, b) => b.price - a.price);
  }

  return result.length > 0 ? result : categoryProducts;
};
