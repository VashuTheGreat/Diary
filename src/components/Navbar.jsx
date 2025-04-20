import React from 'react';

const Navbar = () => {
  return (
    <nav className='flex justify-evenly bg-purple-950 text-white items-center h-16 px-6 sticky top-0 z-10'>
        <div className="logo">
            <span className='font-extrabold text-3xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text'>
                Vdiary
            </span>
        </div>
        <ul className='flex gap-8'>
            <li className='cursor-pointer hover:font-bold transition-all duration-200 font-semibold hover:scale-105'>
                Home
            </li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200 font-semibold hover:scale-105'>
                Your Tasks
            </li>
        </ul>
    </nav>
  );
}

export default Navbar;
