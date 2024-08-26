  <h3 align="center">An E commerce App!</h3>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [LiveDemo](#LiveDemo)
6. 🕸️ [DemoLogin](#DemoLogin)
7. 🕸️ [DockerImage](#Docker-Image)
8. 🕸️ [Code Snippets to Copy](#snippets)

## <a name="introduction">🤖 Introduction</a>

Welcome to the ABC Store eCommerce platform! This project is built for ABC company's first online store, focusing on SEO, optimized performance, and a mobile-friendly user experience.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Next.js**: Server-side rendering and static site generation for optimized performance.
- **TypeScript**: To add type safety to the application.
- **Zustand**: Lightweight state management for managing global state, such as the shopping cart.
- **Tailwind CSS**: For styling the components with a responsive and modern design.
- **ESLint & Prettier**: Code linting and formatting tools to ensure code quality.
- **Docker**: Containerization for easy deployment and scalability
- **Fake Store API**: External API used for product data.
- **localStorage**: To persist data between sessions.

## <a name="features">🔋 Features</a>

### 1. **Landing Screen:**

- **Contains a header menu.**.
- **Welcoming message for the user.**.
- **Displays the newest products.**
- **Displays product categories.**

### 2. **Products Screen**

- **Lists all products under a selected category**
- **Users can select the category from the dropdown menu to list all products under a specific catergory**

### 3. **Products Search and Sorting**

- **Users can search for products by title.**
- **Products can be sorted by price (low to high or high to low)**
- **Product Details Screen Shows product description, image, and specifications**

### 4. **Shopping Cart**

- **Users can add products to the cart from the listing screen or product details screen.**
- **The cart icon in the header displays the number of items.**
- **Shopping cart items are listed with the total amount and delete option.**

### 5. **User Authentication**

- **Login/Logout Functionality**
- **The session persists until the user logs out, ensuring a secure and personalized experience**

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git git clone https://github.com/shory-code-challenges/khaled.mourraad_gmail.com_abc_store.git
cd abc_store

```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## <a name="LiveDemo">LiveDemo</a>

- [LiveDemo](https://eee-app.vercel.app/)

## <a name="DemoLogin">🕸️Demo Login</a>

- username is `mor_2314`
- password is `83r5^_`

## <a name="DockerImage">🕸️ Docker Image</a>

**Cloning Docker Image**

```
docker pull khaled1299/abc-store:latest
```

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>useCartStore</code></summary>

```typescript
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
```

</details>

<details>
<summary><code>Login</code></summary>

```typescript
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useCartStore from '../../../hooks/useCartStore';

const LoginPage = () => {
const router = useRouter();
const { user, isAuthenticated, login, error } = useCartStore();
if (isAuthenticated) {
router.push('/');
}
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [message, setMessage] = useState('');

const formTitle = 'Log in';

const buttonTitle = 'Login';

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setIsLoading(true);
setMessage('');

    try {
      await login(username, password);
      setIsLoading(false);
    } catch (error) {
      console.error('Login failed:', error);
    }

};
return (
<div className="h-[calc(100vh-80px)] px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex items-center justify-center">
<form className="flex flex-col gap-8" onSubmit={handleSubmit}>
{error && <div className="text-red-600">{error}</div>}

        {message && <div className="text-green-600 text-sm">{message}</div>}
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            placeholder="john"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-sm underline cursor-pointer">Forgot Password?</div>

        <button
          className="bg-lama text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : buttonTitle}
        </button>
      </form>
    </div>

);
};

export default LoginPage;
```

</details>
