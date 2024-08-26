import Image from 'next/image';
import useCartStore from '../../hooks/useCartStore';
import { ProductProps } from '../../types/index';

const CartItem = ({
  id,
  title,
  price,
  category,
  description,
  image,
  quantity,
}: ProductProps) => {
  const { removeItemFromCart } = useCartStore();
  const handleRemoveItemFromCart = (productId: string) => {
    removeItemFromCart(productId);
  };
  return (
    <>
      <Image
        src={image}
        alt="image in the cart"
        width={72}
        height={96}
        className="object-cover rounded-md"
      />
      <div className="flex flex-col justify-between w-full gap-1">
        {/* TOP */}
        <div className="mb-4">
          {/* TITLE */}
          <div className="flex items-center justify-between gap-8">
            <h3 className="font-semibold">{title.slice(0, 20)}</h3>
            <div className="p-1 bg-gray-50 rounded-sm">${price}</div>
          </div>
          {/* DESC */}
          <div className="text-sm text-gray-500">
            {description.slice(0, 20)}
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Qty. {quantity}</span>
          <button
            className="text-blue-500"
            onClick={() => handleRemoveItemFromCart(id)}
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
