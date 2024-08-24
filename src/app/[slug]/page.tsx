import Add from '@/components/Add';
import CustomizedProducts from '@/components/CustomizedProducts';
import ProductImages from '@/components/ProductImages';
import { ProductProps } from '../../../types/index';
import { fetchProduct } from '../../../lib/actions';

const SinglePage = async ({ searchParams }: { searchParams: any }) => {
  const productId = searchParams['product'];

  const product: ProductProps = await fetchProduct(productId);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2  top-20 h-max">
        <ProductImages {...product} />
      </div>
      {/* CUSTOMIZED PRODUCT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.title}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">$450</h3>
          <h2 className="font-medium text-2xl">${product.price}</h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <CustomizedProducts />
        <Add productId={productId} />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">{product.title}</h4>
          <p className="">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
