const PRODUCT_PER_PAGE = 20;

export async function fetchProducts({ limit }: { limit?: number }) {
  const response = await fetch(
    `https://fakestoreapi.com/products?limit=${limit || PRODUCT_PER_PAGE}`
  );

  const result = await response.json();

  return result;
}

export async function fetchProduct(productId: number) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );

  const result = await response.json();

  return result;
}
