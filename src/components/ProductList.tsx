import Link from 'next/link';
import React from 'react';
import Product from './Product';
import { ProductProps } from '../../types/index';

import { fetchCategoryProducts } from '../../lib/actions';
import { findProductsContainsSearchParams } from '../../utils/index';

const ProductList = async ({
  categoryName,
  limit,
  searchParmas,
}: {
  categoryName?: string;
  limit?: number;
  searchParmas?: any;
}) => {
  const categoryProducts: ProductProps[] = await fetchCategoryProducts(
    limit,
    categoryName
  );
  // it can be done if there is a good structure backend to give to the api the searchParams?.name
  const products = findProductsContainsSearchParams(
    categoryProducts,
    searchParmas
  );

  // console.log(products);
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-center flex-wrap">
      {products.map((product) => (
        <Link
          href={'/i-am-product?product=' + product.id}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product.id}
        >
          <Product {...product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
