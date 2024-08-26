import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import Slider from '@/components/Slider';
import { Suspense } from 'react';

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Newest Products</h1>
        <Suspense fallback={'loading'}>
          <ProductList limit={4} />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 ">
        <h1 className="text-2xl mb-12 ">Categories</h1>
        <Suspense fallback={'loading'}>
          <CategoryList />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
