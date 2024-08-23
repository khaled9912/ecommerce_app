import Link from 'next/link';
import { categories } from '../../constants/index';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {categories.map((category, index) => (
          <Link
            href="/list?cat=test"
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={index}
          >
            <CategoryItem name={category.name} imgUrl={category.img} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
