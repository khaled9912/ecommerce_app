'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useCartStore from '../../hooks/useCartStore';

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { logout, cartItems } = useCartStore();

  return (
    <div>
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="menu-items">
          <Link href="/">HomePage</Link>
          <Link href="/list">Products</Link>
          <Link href="/">About</Link>
          <Link href="/">Contacts</Link>
          <button onClick={() => logout()}>Logout</button>
          <Link href="/">Cart({cartItems.length})</Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
