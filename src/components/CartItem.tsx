import Image from 'next/image';
import { CartItemProps } from '../../types/index';

const CartItem = ({
  productName,
  price,
  available,
  quantity,
}: CartItemProps) => {
  return (
    <>
      <div className="flex gap-4">
        <Image
          src="https://images.pexels.com/photos/18322084/pexels-photo-18322084/free-photo-of-flowers-on-a-notebook.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          width={72}
          height={96}
          className="object-cover rounded-md"
        />
        <div className="flex flex-col justify-between w-full gap-1">
          {/* TOP */}
          <div className="mb-4">
            {/* TITLE */}
            <div className="flex items-center justify-between gap-8">
              <h3 className="font-semibold">{productName}</h3>
              <div className="p-1 bg-gray-50 rounded-sm">${price}</div>
            </div>
            {/* DESC */}
            <div className="text-sm text-gray-500">{available}</div>
          </div>
          {/* BOTTOM */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Qty. {quantity}</span>
            <span className="text-blue-500">Remove</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
