import Link from 'next/link';
import React from 'react';
import { products } from '../../constants/index';
import Image from 'next/image';
import Product from './Product';

const ProductList = () => {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {/* TODO change the product data to be fetched from th DB. */}
      {products.map((product, index) => (
        <Link
          href="/test"
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={index}
        >
          <Product
            name={product.name}
            price={product.price}
            imgUrl={product.img}
            description={product.description}
          />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
