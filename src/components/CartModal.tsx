'use client';

import CartItem from './CartItem';

const CartModal = () => {
  const cartItems = true;

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
            <CartItem
              productName="item 1 "
              price={34}
              available={true}
              quantity={4}
            />
            <CartItem
              productName="item 2"
              price={45}
              available={false}
              quantity={3}
            />

            {/* BOTTOM */}
            <div className="">
              <div className="flex items-center justify-between font-semibold">
                <span className="">Subtotal</span>
                <span className="">$49</span>
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
