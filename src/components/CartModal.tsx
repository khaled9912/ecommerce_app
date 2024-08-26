'use client';

import CartItem from './CartItem';
import useCartStore from '../../hooks/useCartStore';

const CartModal = () => {
  const { cartItems, totalPrice } = useCartStore();
  return (
    <div className="cart-modal">
      {!cartItems ? (
        <div>Cart is Empty</div>
      ) : (
        // LIST
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {cartItems.map((item) => (
              <CartItem {...item} />
            ))}

            {/* BOTTOM */}
            <div className="">
              <div className="flex items-center justify-between font-semibold">
                <span className="">Subtotal</span>
                <span className="">${totalPrice}</span>
              </div>
              <p className="text-gray-500 text-sm mt-2 mb-4">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-between text-sm">
                <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                  View Cart
                </button>
                <button className="rounded-md py-3 px-4 bg-black text-white">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
