"use client";
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname()

    const isDashboard = pathname.startsWith("/dashboard");


    return (
        <nav className=" h-[8vh] flex justify-between items-center p-4 b1">
            <Link href='/' className="logo text-white flex items-center justify-center  font-bold text-xl cursor-pointer">
                <span className='m-5 pb-2'> <img src="/coffee.gif" width="30" height="30" alt="Coffee" />
                </span>
                <span className="font-bold text-3xl c1">
                    Get
                </span>

                <span className='font-semibold text-2xl c2'>Me</span>
                <span className='font-bold text-3xl c3'>A</span>
                <span className='font-semibold text-xl c4'>Coffee</span>
            </Link>
            <div className='flex justify-center items-center gap-8'>
                {session ? (
                    <>
                        {isDashboard ? (
                            <ul className="flex list-none font-bold text-xl">
                                <li className="c1 mx-2 cursor-pointer">
                                    <Link href="/dashboard">Overview</Link>
                                </li>
                                <li className="c2 mx-2 cursor-pointer">
                                    <Link href={`/${session.user.username}`}>Profile</Link>
                                </li>
                                <li className="c3 mx-2 cursor-pointer">
                                    <Link href="/dashboard/settings">Settings</Link>
                                </li>
                            </ul>
                        ) : (

                            <ul className="flex list-none font-bold text-xl">
                                <li className="c6 gap-2 mx-4 cursor-pointer">Welcome! {session?.user?.name}!</li>
                                <li className="c1 mx-4 cursor-pointer">Home</li>
                                <li className="c2 mx-4 cursor-pointer">About</li>
                                <li className="c3 mx-4 cursor-pointer">Contact</li>
                                <li className="c4 mx-2 cursor-pointer"><Link href="/dashboard">Dashboard</Link></li>
                            </ul>
                        )}
                        <button onClick={() => signOut()} className="text-amber-200 cursor-pointer bg-blue-900 my-5 rounded-3xl px-7 py-2">Sign Out</button>
                    </>
                ) : (
                    <>
                        <ul className="flex list-none font-bold text-xl">
                            <li className="c1 mx-4 cursor-pointer">Home</li>
                            <li className="c2 mx-4 cursor-pointer">About</li>
                            <li className="c3 mx-4 cursor-pointer">Contact</li>
                        </ul>
                        <Link href="/login">
                            <button className="text-amber-200 cursor-pointer bg-blue-900 my-5 rounded-3xl px-7 py-2">Login</button>
                        </Link>
                    </>
                )}
            </div>

        </nav>
    );
};

export default Navbar;