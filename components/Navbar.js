"use client";
import React, { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false);

    const isDashboard = pathname.startsWith("/dashboard");

    const toggleMenu = () => setIsOpen(!isOpen);

    const NavLinks = () => (
        <>
            {session ? (
                <>
                    {isDashboard ? (
                        <>
                            <li className="c1 cursor-pointer py-2 md:py-0">
                                <Link href="/" onClick={() => setIsOpen(false)}>Overview</Link>
                            </li>
                            <li className="c2 cursor-pointer py-2 md:py-0">
                                <Link href={`/${session.user.username}`} onClick={() => setIsOpen(false)}>Profile</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="c1 cursor-pointer py-2 md:py-0">
                                <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                            </li>
                            <li className="c2 cursor-pointer py-2 md:py-0">
                                <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
                            </li>
                            <li className="c4 cursor-pointer py-2 md:py-0">
                                <Link href="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            </li>
                        </>
                    )}
                </>
            ) : (
                <>
                    <li className="c1 cursor-pointer py-2 md:py-0">
                        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                    </li>
                    <li className="c2 cursor-pointer py-2 md:py-0">
                        <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
                    </li>
                </>
            )}
        </>
    );

    return (
        <nav className="min-h-[8vh] h-auto flex flex-col md:flex-row justify-between items-center p-4 b1 relative z-50">
            <div className="flex justify-between items-center w-full md:w-auto">
                <Link href='/' className="logo text-white flex items-center justify-center font-bold text-xl cursor-pointer">
                    <span className='mr-2'>
                        <img src="/coffee.gif" width="30" height="30" alt="Coffee" />
                    </span>
                    <span className="font-bold text-2xl md:text-3xl c1">Get</span>
                    <span className='font-semibold text-xl md:text-2xl c2'>Me</span>
                    <span className='font-bold text-2xl md:text-3xl c3'>A</span>
                    <span className='font-semibold text-lg md:text-xl c4'>Coffee</span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none p-2"
                    onClick={toggleMenu}
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Nav Items */}
            <div className={`${isOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mt-4 md:mt-0 w-full md:w-auto transition-all duration-300 ease-in-out`}>
                <ul className="flex flex-col md:flex-row list-none font-bold text-lg md:text-xl items-center gap-2 md:gap-6 w-full md:w-auto">
                    {session && !isDashboard && (
                        <li className="c6 text-center text-sm md:text-base mb-2 md:mb-0 hidden lg:block">Welcome! {session?.user?.name}!</li>
                    )}
                    <NavLinks />
                </ul>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    {session ? (
                        <button
                            onClick={() => { signOut({ callbackUrl: "/" }); setIsOpen(false); }}
                            className="text-amber-200 cursor-pointer bg-blue-900 rounded-3xl px-6 py-2 w-full md:w-auto text-sm md:text-base hover:bg-blue-800 transition"
                        >
                            Sign Out
                        </button>
                    ) : (
                        <Link href="/login" onClick={() => setIsOpen(false)} className="w-full md:w-auto">
                            <button className="text-amber-200 cursor-pointer bg-blue-900 rounded-3xl px-6 py-2 w-full md:w-auto text-sm md:text-base hover:bg-blue-800 transition">
                                Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
