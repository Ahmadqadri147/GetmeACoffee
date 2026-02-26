"use client";
import React, { useState, useEffect, useRef } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'

const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);
    const mobileSearchRef = useRef(null);

    const isDashboard = pathname.startsWith("/dashboard");

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (searchRef.current && !searchRef.current.contains(event.target)) &&
                (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target))
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.trim().length > 0) {
                try {
                    const res = await fetch(`/api/search?q=${searchQuery}`);
                    const data = await res.json();
                    if (data.success) {
                        setSuggestions(data.users);
                        setShowSuggestions(true);
                    }
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/${searchQuery.trim()}`);
            setShowSuggestions(false);
            setSearchQuery("");
            setIsOpen(false);
        }
    };

    const handleSuggestionClick = (username) => {
        router.push(`/${username}`);
        setShowSuggestions(false);
        setSearchQuery("");
        setIsOpen(false);
    };

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

                {/* Search Bar */}
                <div className="relative mx-4 flex-1 max-w-md hidden md:block" ref={searchRef}>
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                            className="w-full bg-slate-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700 transition-all"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </form>

                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute mt-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-[100]">
                            {suggestions.map((user) => (
                                <div
                                    key={user.username}
                                    onMouseDown={() => handleSuggestionClick(user.username)}
                                    className="flex items-center gap-3 p-3 hover:bg-slate-800 transition-colors cursor-pointer"
                                >
                                    <img
                                        src={user.profilepic || "/man.gif"}
                                        alt={user.username}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium text-sm">@{user.username}</span>
                                        <span className="text-gray-400 text-xs">{user.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


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
                
                {/* Mobile Search Bar */}
                <div className="w-full md:hidden px-2 mb-2" ref={mobileSearchRef}>
                    <form onSubmit={handleSearchSubmit} className="relative">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
                            className="w-full bg-slate-800 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-700"
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </form>
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute mt-2 left-0 right-0 mx-4 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-[100]">
                            {suggestions.map((user) => (
                                <div
                                    key={user.username}
                                    onMouseDown={() => handleSuggestionClick(user.username)}
                                    className="flex items-center gap-3 p-3 hover:bg-slate-800 transition-colors cursor-pointer"
                                >
                                    <img
                                        src={user.profilepic || "/man.gif"}
                                        alt={user.username}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium text-sm">@{user.username}</span>
                                        <span className="text-gray-400 text-xs">{user.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

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
