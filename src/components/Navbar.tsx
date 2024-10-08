'use client';
import Link from 'next/link';
import React from 'react';
import Menu from './Menu';
import Image from 'next/image';
import SearchBar from './SearchBar';
import NavIcons from './NavIcons';
import useCartStore from '../../hooks/useCartStore';

const Navbar = () => {
  const { user } = useCartStore();
  return (
    <div className="navbar">
      <div className="h-full flex items-center justify-between md:hidden">
        {/* Mobile */}
        <Link href="/">
          <div className="text-2xl tracking-wide">ABC</div>
        </Link>
        <Menu />
      </div>
      {/* BIGGER SCREENS */}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/* LEFT */}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12 ">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" width={24} height={24} alt={'logo icon'} />
            <div className="text-2xl tracking-wide">ABC</div>
          </Link>
          {/* LINKS */}
          <div className="hidden xl:flex gap-4">
            <Link href="/">HomePage</Link>
            <Link href="/list">Products</Link>
            <Link href="/">About</Link>
            <Link href="/">Contacts</Link>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
          <SearchBar />
          <NavIcons />
        </div>
        <div className="text-cyan-600">
          <h1>Welcome,{user}!</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
