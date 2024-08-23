'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const ProductImages = ({ image, id }: { image: string; id: number }) => {
  //TEMPORARY
  const FOUR_ITMES = [1, 2, 3, 4];

  const [img, setImg] = useState(image);
  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={img}
          alt="image of a shoes product"
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8 curs">
        {FOUR_ITMES.map((item) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={item}
            onClick={() => setImg(image)}
          >
            <Image
              src={image}
              alt="image of a product"
              fill
              sizes="30vw"
              className={`object-cover  scale-100 hover:scale-150   easy duration-500 rounded-md`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
