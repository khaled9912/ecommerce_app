import Link from 'next/link';
import CategoryItem from './CategoryItem';
import { CategoryItemProps } from '../../types/index';
import { fetchCategories } from '../../lib/actions';
import { addImagesToCategories } from '../../utils/index';

const CategoryList = async () => {
  const categories = await fetchCategories();

  // TODO the api result does not have a cat_image so, i used static images for now
  const categoriesWithImages: CategoryItemProps[] =
    addImagesToCategories(categories);
  return (
    <div className=" ">
      <div className="mt-12 flex  gap-x-8 gap-y-16 justify-between flex-wrap ">
        {categoriesWithImages.map((category) => (
          <Link
            href={`/list?cat=${category.name}`}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
            key={category.name}
          >
            <CategoryItem {...category} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
