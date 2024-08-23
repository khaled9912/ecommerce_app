import Image from 'next/image';
import React from 'react';
import { ProductProps } from '../../types/index';
import { images } from '../../constants/index';

const Product = ({ title, price, description, image }: ProductProps) => {
  return (
    <>
      <div className="relative w-full h-80">
        <Image
          src={image}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out hover:opacity-0"
          alt={description}
          fill
          sizes="25vw"
        />
        <Image
          src={images.imgUrl3}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100"
          alt="product image"
          fill
          sizes="25vw"
        />
      </div>
      <div className="flex justify-between">
        <span className="font-medium">{title.slice(0, 15)}</span>
        <span className="font-semibold">${price}</span>
      </div>
      <div className="text-sm text-gray-500">{description.slice(0, 27)}</div>
      <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-sm hover:bg-lama hover:text-white">
        Add to Cart
      </button>
    </>
  );
};

export default Product;
