"use client";

import React from "react";
import Link from 'next/link';

const About = () => {
    return (
        <div className="min-h-screen py-10 md:py-16 px-4 md:px-6 max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 md:mb-24">
                <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold mb-6 c6 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                    About Get Me A Coffee
                </h1>
                <p className="text-base md:text-xl text-blue-300 max-w-3xl mx-auto leading-relaxed px-4">
                    Get Me A Coffee is a crowdfunding platform designed for creators,
                    artists, and developers to receive appreciation and support from their
                    fans in the form of small donations—called "coffees."
                </p>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-24 md:mb-32">
                <div className="bg-gradient-to-br from-violet-900/40 to-indigo-900/40 p-6 md:p-8 rounded-3xl border border-violet-800 backdrop-blur-md shadow-xl">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 c1">Our Vision</h2>
                    <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                        We believe that every creator deserves a sustainable way to fund their passion.
                        Whether you're writing code, drawing art, or making videos, your audience
                        wants to see you succeed. We provide the simplest bridge between your
                        creativity and their support.
                    </p>
                    <img
                        src="/group.gif"
                        alt="Collaboration"
                        className="w-full h-40 md:h-56 object-cover rounded-xl border border-indigo-700 shadow-inner"
                    />
                </div>
                <div className="space-y-6 md:space-y-8 px-2 md:px-0">
                    <div className="flex gap-4 md:gap-6 items-start">
                        <div className="bg-blue-600 p-3 md:p-4 rounded-2xl shadow-lg shadow-blue-500/20 text-xl">
                            🚀
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Empowering Creators</h3>
                            <p className="text-gray-400 text-sm md:text-base">
                                Helping individuals turn their side projects into sustainable careers with direct fan support.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 md:gap-6 items-start">
                        <div className="bg-fuchsia-600 p-3 md:p-4 rounded-2xl shadow-lg shadow-fuchsia-500/20 text-xl">
                            💎
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Simple & Transparent</h3>
                            <p className="text-gray-400 text-sm md:text-base">
                                No complex tiers or subscriptions. Just simple, one-time donations that make a huge difference.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 md:gap-6 items-start">
                        <div className="bg-emerald-600 p-3 md:p-4 rounded-2xl shadow-lg shadow-emerald-500/20 text-xl">
                            🌍
                        </div>
                        <div>
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">Community Driven</h3>
                            <p className="text-gray-400 text-sm md:text-base">
                                A platform where supporters can send messages of encouragement along with their contributions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How it Works Section */}
            <div className="mb-24 md:mb-32">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 c5">How it Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 text-center hover:bg-white/10 hover:border-blue-500/30 transition duration-300 shadow-xl group">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mx-auto mb-6 shadow-xl shadow-blue-500/20 group-hover:scale-110 transition">
                            🛠️
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Set Up Profile</h3>
                        <p className="text-gray-500 group-hover:text-gray-300 transition text-sm md:text-base">
                            Create your custom dashboard, add your bio, social links, and set your goals.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 text-center hover:bg-white/10 hover:border-pink-500/30 transition duration-300 shadow-xl group">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-fuchsia-500 to-pink-600 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mx-auto mb-6 shadow-xl shadow-pink-500/20 group-hover:scale-110 transition">
                            📣
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Share with Fans</h3>
                        <p className="text-gray-500 group-hover:text-gray-300 transition text-sm md:text-base">
                            Post your profile link on social media. Let your audience know they can support your work.
                        </p>
                    </div>
                    <div className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 text-center hover:bg-white/10 hover:border-orange-500/30 transition duration-300 shadow-xl group md:col-span-2 lg:col-span-1">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mx-auto mb-6 shadow-xl shadow-orange-500/20 group-hover:scale-110 transition">
                            ☕
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Get Funded</h3>
                        <p className="text-gray-500 group-hover:text-gray-300 transition text-sm md:text-base">
                            Receive one-time donations and supportive messages directly to your dashboard.
                        </p>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center lg:text-left">Why Choose Us?</h2>
                        <ul className="space-y-4 md:space-y-6">
                            {[
                                "No monthly fees or hidden charges.",
                                "Fast and secure payment integration.",
                                "Interactive dashboard for supporters and creators.",
                                "Rich customization options for your profile.",
                                "Real-time support tracking."
                            ].map((benefit, idx) => (
                                <li key={idx} className="flex gap-4 items-center text-base md:text-lg text-blue-100">
                                    <span className="text-green-400 text-xl md:text-2xl flex-shrink-0">✔</span>
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative group mt-8 lg:mt-0">
                        <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
                        <img
                            src="/man.gif"
                            alt="Creator Working"
                            className="relative rounded-2xl md:rounded-3xl border-4 border-indigo-500/30 shadow-2xl mx-auto group-hover:scale-[1.02] transition duration-500"
                        />
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-20 md:mt-32 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Ready to get started?</h2>
                <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4">
                    <Link
                        href="/login"
                        className="px-8 md:px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full font-bold text-white hover:scale-105 transition shadow-lg shadow-blue-500/25 text-center"
                    >
                        Start Your Page
                    </Link>
                    <Link
                        href="/"
                        className="px-8 md:px-10 py-4 bg-white/10 rounded-full font-bold text-white border border-white/20 hover:bg-white/20 transition text-center"
                    >
                        Explore Creators
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default About;
