import Link from 'next/link';
import React from 'react';
import Product from './Product';
import { ProductProps } from '../../types/index';
import { fetchProducts } from '../../utils/index';

const ProductList = async ({ limit }: { limit?: number }) => {
  const products: ProductProps[] = await fetchProducts({ limit });

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
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
