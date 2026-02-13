"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return <>
    <div>
      <div className="relative   ">
        <h1 className="text-4xl font-bold text-center mt-10 c6">
          Welcome to Your Dashboard, {session?.user?.name}!
        </h1>
      </div>
      {/* input for name , username , profile picture , cover picture , about section , social media links, instamojo clint id and secret key for payment gateway integration. */}
      {/* Profile Setup Section */}

      <div className="max-w-4xl mx-auto m-16 bg-violet-900/80 backdrop-blur-xl text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center c5 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">
          Complete Your Profile
        </h2>

        <form className="space-y-5">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded bg-pink-950 border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          {/* Username */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded bg-pink-950 border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          {/* Profile Picture */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full font-bold "
            />
          </div>

          {/* Cover Picture */}
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Cover Picture
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full font-bold "
            />
          </div>

          {/* About */}
          <textarea
            placeholder="About you..."
            rows="4"
            className="w-full p-3 rounded bg-pink-950 border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          {/* Social Links */}
          <input
            type="url"
            placeholder="Instagram Profile Link"
            className="w-full p-3 rounded bg-pink-950 border border-gray-700"
          />
          <input
            type="url"
            placeholder="Twitter / X Profile Link"
            className="w-full p-3 rounded bg-pink-950 border border-gray-700"
          />
          <input
            type="url"
            placeholder="LinkedIn Profile Link"
            className="w-full p-3 rounded bg-pink-950 border border-gray-700"
          />

          {/* Instamojo Credentials */}
          <div className="border-t border-gray-700 pt-5">
            <h3 className="text-lg font-medium mb-3">
              Instamojo Payment Integration
            </h3>

            <input
              type="text"
              placeholder="Instamojo Client ID"
              className="w-full p-3 rounded bg-pink-950 border border-gray-700 mb-3"
            />
            <input
              type="password"
              placeholder="Instamojo Secret Key"
              className="w-full p-3 rounded bg-pink-950 border border-gray-700"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded font-semibold"
          >
            Save Profile
          </button>
        </form>
      </div>


    </div>
  </>
};

export default Dashboard;
