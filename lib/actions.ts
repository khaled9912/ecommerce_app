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
