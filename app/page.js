import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="px-4">
        <div className="flex items-center text-center justify-center flex-col text-white pt-10 md:pt-20">
          <div className="flex flex-col md:flex-row gap-2 md:gap-5 justify-center items-center text-3xl md:text-5xl font-extrabold c5 cursor-pointer p-5">
            <span>Buy me a coffee</span>
            <span className="pb-2 md:pb-5">
              <img src="/coffee.gif" width={50} alt="" className="w-10 md:w-12" />
            </span>
          </div>
          <h1 className="text-pink-400 text-base md:text-lg max-w-2xl px-4">
            A crowdfunding platform for creators. Get funded by your fans and supporters. Start your journey today!
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/login"
              className="text-amber-200 bg-blue-900 rounded-3xl px-10 py-3 inline-block cursor-pointer font-bold hover:bg-blue-800 transition text-center"
            >
              Start Now!
            </Link>

            <Link
              href="/about"
              className="text-amber-200 bg-blue-900 rounded-3xl px-10 py-3 inline-block cursor-pointer font-bold hover:bg-blue-800 transition text-center"
            >
              Read More!
            </Link>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <div className="text-center text-blue-300 text-xl md:text-2xl font-bold px-4">
            <h1>Your fans can buy you a coffee!</h1>
          </div>
          <div className="container mx-auto flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-36 justify-center items-center md:items-baseline p-6 md:p-10">
            <div className="flex flex-col items-center text-center max-w-xs transition-transform hover:scale-105">
              <img src="/man.gif" width={150} alt="" className="w-32 md:w-40" />
              <h1 className="p-4 md:p-5 c4 font-bold text-lg md:text-xl">Empower Your Passion</h1>
              <p className="text-pink-700 font-bold text-sm md:text-base px-2">Give your community a way to support the amazing work you do.</p>
            </div>
            <div className="flex flex-col items-center text-center max-w-xs transition-transform hover:scale-105">
              <img src="/coin.gif" width={105} alt="" className="w-24 md:w-28" />
              <h1 className="p-4 md:p-5 c2 font-bold text-lg md:text-xl">Simple & Secure</h1>
              <p className="text-pink-700 font-bold text-sm md:text-base px-2">Direct payments from your fans with zero hassle and full transparency.</p>
            </div>
            <div className="flex flex-col items-center text-center max-w-xs transition-transform hover:scale-105">
              <img src="/group.gif" width={100} alt="" className="w-24 md:w-28" />
              <h1 className="p-4 md:p-5 c3 font-bold text-lg md:text-xl">Build Your Community</h1>
              <p className="text-pink-700 font-bold text-sm md:text-base px-2">Connect with your most dedicated supporters and grow together.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/20 py-16 mt-10">
        <div className="text-center text-blue-300 text-xl md:text-2xl font-bold mb-10 px-4">
          <h1>Learn more - About us!</h1>
        </div>
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/YxkGdX4WIBE?si=kRuL4fGpTiRzzWYr"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>


    </>
  );
}
