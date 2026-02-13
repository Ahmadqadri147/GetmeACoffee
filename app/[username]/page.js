import React from 'react';

const UserProfilePage = ({ params }) => {
  const resolvedParams = React.use(params);
  const { username } = resolvedParams;

  return (
    <div className=" min-h-screen">
      <div className="relative  h-70 md:h-96 ">
        <img
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/20.gif?token-hash=rhj_7BVTCNVpExt9_zHArWm_frjnqT0D4-6mgWRKdoU%3D&token-time=1772582400"
          alt="Cover Image"
          className="w-full h-full object-cover"
        />

        <img
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjozNjAsInciOjM2MH0%3D/4.gif?token-hash=DznCkKuaHgRd1sFXZH9ucW0cTgr2KkAsp8MyzUFRWw4%3D&token-time=1771545600"
          alt="Profile"
          width={160}
          height={160}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-40 h-40 rounded-full border-4 border-white object-cover"
        />
      </div>

      <div className="pt-25 text-center">
        <h1 className="text-3xl font-serif font-bold text-white  uppercase "> {username}!</h1>
        <p className=" text-white mt-2 ">Welcome to {username.charAt(0).toUpperCase() + username.slice(1)}&apos;s profile page!</p>
      </div>

      <div className="mt-8 p-4">
        <div className="max-w-4xl flex-col text-center mx-auto bg-transparent shadow-blue-400 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl  font-extrabold  text-shadow-amber-950 text-amber-600 ">About</h2>
          <p className="mt-2 font-semibold text-blue-300 text-shadow-blue-800  text-sm">
            Creating Animated arts for VTT&apos;S
          </p>
          <p className="mt-2 text-shadow-blue-400 text-blue-600 sm">
            983,37 members . 106 posts . 1.2K followers . $15,893/month . 1.2K patrons
          </p>
        </div>
      </div>

      <div className="min-h-screen  py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            Thanks for Supporting Us 💙
          </h1>
          <p className="mt-2 text-lg text-fuchsia-300">
            Support us and become a part of the journey 🚀
          </p>
        </div>


        <div className="max-w-7xl mx-auto mt-14 px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-stretch">

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-[2px] rounded-3xl shadow-2xl">
            <div className="bg-blue-950/80 backdrop-blur-xl rounded-3xl p-8 flex flex-col h-full">

              <h2 className="text-2xl font-bold text-blue-300 text-center mb-6">
                Supporters 💙
              </h2>

              {/* Supporters List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-900">

                {[
                  "Aman donated $10 with a message 💬",
                  "Sara donated $20 with love ❤️",
                  "Rohit donated $5 with good vibes ✨",
                  "Ananya donated $50 – legend 🐐",
                  "Karan donated $15 – respect 🔥",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-blue-900/60 px-5 py-3 rounded-xl border border-blue-700 hover:scale-[1.02] transition"
                  >
                    <span className="w-2.5 h-2.5 bg-blue-400 rounded-full"></span>
                    <span className="text-blue-100">{item}</span>
                  </div>
                ))}
              </div>


              <p className="mt-4 text-center text-sm text-blue-400">
                Showing recent supporters 💫
              </p>
            </div>
          </div>


          <div className="bg-gradient-to-br from-fuchsia-600 via-purple-600 to-indigo-600 p-[2px] rounded-3xl shadow-2xl">
            <div className="bg-fuchsia-950/80 backdrop-blur-xl rounded-3xl p-8 text-center text-fuchsia-100 flex flex-col h-full">

              <h2 className="text-3xl font-extrabold tracking-wide">
                Make a Payment 💜
              </h2>
              <p className="text-sm mt-2 text-fuchsia-300">
                Support with love & good vibes ✨
              </p>


              <div className="flex flex-col gap-4 mt-8">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl bg-fuchsia-900/70 border border-fuchsia-700 text-white placeholder-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                />
                <input
                  type="text"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 rounded-xl bg-fuchsia-900/70 border border-fuchsia-700 text-white placeholder-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full px-4 py-3 rounded-xl bg-fuchsia-900/70 border border-fuchsia-700 text-white placeholder-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                />
              </div>


              <button className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white font-bold tracking-wide shadow-lg hover:scale-[1.03] hover:shadow-fuchsia-500/50 transition-all duration-300">
                Pay Now 🚀
              </button>

              <div className="flex items-center gap-3 my-6">
                <span className="flex-1 h-px bg-fuchsia-700"></span>
                <span className="text-xs text-fuchsia-400 uppercase">
                  quick select
                </span>
                <span className="flex-1 h-px bg-fuchsia-700"></span>
              </div>


              <div className="flex justify-center gap-4 flex-wrap">
                {["$5", "$10", "$20", "$50"].map((amt) => (
                  <button
                    key={amt}
                    className="px-7 py-2 rounded-full bg-fuchsia-800/80 text-white font-semibold border border-fuchsia-600 hover:bg-fuchsia-600 hover:scale-105 transition-all duration-200"
                  >
                    {amt}
                  </button>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default UserProfilePage;
