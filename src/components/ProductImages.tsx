'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { products } from '../../constants/index';

const ProductImages = () => {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={products[index].img}
          alt="image of a shoes product"
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8 curs">
        {products.map((product, index) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={product.img}
            onClick={() => setIndex(index)}
          >
            <Image
              src={product.img}
              alt="image of a shoes product"
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
