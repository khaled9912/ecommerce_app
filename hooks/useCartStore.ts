import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  productId: string;
  quantity: number;
}

interface CartState {
  cartItems: Product[];
  addItemToCart: (item: Product) => void;
  removeItemFromCart: (productId: string) => void;
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],

      addItemToCart: (item: Product) => {
        console.log('inside addItem cart', item);

        // Find if the item already exists in the cart
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.productId === item.productId
        );

        console.log('itemExists', itemExists);

        if (itemExists) {
          // If item exists, increase its quantity
          itemExists.quantity += item.quantity;
          // Update the state with the modified cart items
          set({ cartItems: [...get().cartItems] });
        } else {
          // If item does not exist, create a new item
          const newItem: Product = {
            productId: item.productId,
            quantity: item.quantity,
          };
          console.log('newItem', newItem);
          // Add the new item to the cart
          set({ cartItems: [...get().cartItems, newItem] });
          console.log(get().cartItems);
        }
      },
      removeItemFromCart: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.productId === productId
        );

        if (itemExists) {
          if (typeof itemExists.quantity === 'number') {
            const updatedCartItems = get().cartItems.filter(
              (item) => item.productId !== productId
            );
            set({ cartItems: updatedCartItems });
          }
        }
      },
    }),
    {
      name: 'cart-items',
    }
  )
);

export default useCartStore;
