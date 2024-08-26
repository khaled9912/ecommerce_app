'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import CartModal from './CartModal';
import useCartStore from '../../hooks/useCartStore';

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, logout } = useCartStore();
  let cartCount;
  const router = useRouter();
  cartCount = cartItems.length;
  // TEMPORARY
  // const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt="profile icon"
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0,2) z-20  text-cyan-500">
          <Link href="/">Profile</Link>
          <button
            className="mt-2 cursor-pointer"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      )}
      <Image
        src="/notification.png"
        alt="notification icon"
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image
          src="/cart.png"
          alt="cart icon"
          width={22}
          height={22}
          className="cursor-pointer"
        />

        <div
          className={`absolute -top-4 -right-4 w-6 h-6 ${cartCount > 0 && 'bg-lama'} rounded-full text-white text-sm flex items-center justify-center`}
        >
          {cartCount > 0 && cartCount}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default NavIcons;
