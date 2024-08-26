import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductProps } from '../types/index';

interface CartState {
  cartItems: ProductProps[];
  user: string | null;
  isAuthenticated: boolean;
  error: string;
  totalPrice: number;
  addItemToCart: (item: ProductProps, quantity: number) => void;
  removeItemFromCart: (productId: string) => void;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  calculateTotalPrice: () => void;
}

const useCartStore = create(
  persist<CartState>(
    (set, get) => ({
      cartItems: [],
      user: null,
      isAuthenticated: false,
      totalPrice: 0,
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
            set({ user: 'Shory', isAuthenticated: true });
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
        set({ user: null, isAuthenticated: false, error: '' });
        localStorage.removeItem('user');
        set;
      },
      error: '',
      addItemToCart: (item: ProductProps, quantity: number) => {
        // Find if the item already exists in the cart
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (itemExists) {
          // If item exists, increase its quantity
          itemExists.quantity += quantity;
          // Update the state with the modified cart items
          set({ cartItems: [...get().cartItems] });
        } else {
          // If item does not exist, create a new item
          const newItem: ProductProps = {
            ...item,
            id: item.id,
            quantity: quantity,
          };
          // Add the new item to the cart
          set({ cartItems: [...get().cartItems, newItem] });
        }
        // Recalculate the total price
        get().calculateTotalPrice();
      },
      removeItemFromCart: (productId) => {
        const itemExists = get().cartItems.find(
          (cartItem) => cartItem.id === productId
        );
        if (itemExists) {
          if (typeof itemExists.quantity === 'number') {
            const updatedCartItems = get().cartItems.filter(
              (item) => item.id !== productId
            );
            set({ cartItems: updatedCartItems });
          }
        }
        // Recalculate the total price
        get().calculateTotalPrice();
      },
      calculateTotalPrice: () => {
        const total = get().cartItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0
        );
        set({ totalPrice: total });
      },
    }),
    {
      name: 'cart-items',
    }
  )
);

export default useCartStore;
