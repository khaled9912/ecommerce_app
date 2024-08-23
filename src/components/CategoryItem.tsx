import React from 'react';
import { CategoryItemProps } from '../../types/index';
import Image from 'next/image';

const CategoryItem = ({ name, imgUrl }: CategoryItemProps) => {
  return (
    <>
      <div className="relative bg-slate-100 w-full h-96">
        <Image
          src={imgUrl || 'category.png'}
          alt="category product image"
          fill
          sizes="20vw"
          className="object-cover"
        />
      </div>
      <h1 className="mt-8 font-light text-xl tracking-wide ">{name}</h1>
    </>
  );
};

export default CategoryItem;
