import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ProductProps } from '../../types/index';

const Product = ({ name, price, imgUrl, description }: ProductProps) => {
  return (
    <>
      <div className="relative w-full h-80">
        <Image
          src={imgUrl}
          className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          alt="product image"
          fill
          sizes="25vw"
        />
        {/* TODO the below image will appear when the opacity of the above one reach to zero */}
        {/* <Image
            src={}
            className="absolute object-cover rounded-md"
            alt="product image"
            fill
            sizes="25vw"
          /> */}
      </div>
      <div className="flex justify-between">
        <span className="font-medium">{name}</span>
        <span className="font-semibold">${price}</span>
      </div>
      <div className="text-sm text-gray-500">{description}</div>
      <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-sm hover:bg-lama hover:text-white">
        Add to Cart
      </button>
    </>
  );
};

export default Product;
