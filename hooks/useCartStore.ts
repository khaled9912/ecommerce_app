import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductCartProps } from '../types/index';

interface CartState {
  cartItems: ProductCartProps[];
  user: string | null;
  isAuthenticated: boolean;
  error: string;
  addItemToCart: (item: ProductCartProps) => void;
  removeItemFromCart: (productId: string) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],
      user: 'Shory',
      isAuthenticated: false,
      login: async (username, password) => {
        // if we have an api we can hanlde this to recieve a token after the user authenticate.
        try {
          const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
          if (response.ok) {
            const data = await response.json();
            set({ user: data.user, isAuthenticated: true });
            localStorage.setItem('user', JSON.stringify(data.user));
          } else {
            set({ error: 'Invalid username or password!' });
            throw new Error('Login failed');
          }
        } catch (error) {
          console.error('Login error:', error);
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('user');
      },
      error: '',
      addItemToCart: (item: ProductCartProps) => {
        // Find if the item already exists in the cart
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.productId === item.productId
        );

        if (itemExists) {
          // If item exists, increase its quantity
          itemExists.quantity += item.quantity;
          // Update the state with the modified cart items
          set({ cartItems: [...get().cartItems] });
        } else {
          // If item does not exist, create a new item
          const newItem: ProductCartProps = {
            productId: item.productId,
            quantity: item.quantity,
          };
          // Add the new item to the cart
          set({ cartItems: [...get().cartItems, newItem] });
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
