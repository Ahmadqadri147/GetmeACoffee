"use client";

import React, { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const Login = () => {

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.name) {

      router.replace(`/${session.user.name.replace(/\s/g, "")}`);
    } else if (session) {
      router.replace("/"); // Fallback or a generic logged-in page if username is not directly available
    }
  }, [session, router]);
  // Loading state fix (hydration error avoid)
  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>
  }

  // Already logged in
  if (session) {
    return <p className="text-center mt-10">You are already logged in ✅</p>
  }

  // Prevent page reload on form submit
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (

    <div className="flex min-h-screen items-center justify-center p-2">

      <div className="relative w-full max-w-md rounded-lg bg-white p-5 shadow [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">

        <div className="text-center">
          <p className="mb-3 text-2xl font-semibold text-slate-900">
            Login to your account
          </p>

          <p className="text-sm text-slate-600">
            You must be logged in to perform this action.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-2">

          <button
            onClick={() => signIn("github")}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              className="h-[18px] w-[18px]"
              alt="GitHub"
            />
            Continue with GitHub
          </button>

          <button
            onClick={() => signIn("google")}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="h-[18px] w-[18px]"
              alt="Google"
            />
            Continue with Google
          </button>

          {/* Only keep this if LinkedIn provider configured */}
          <button
            onClick={() => signIn("linkedin")}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/448234/linkedin.svg"
              className="h-[18px] w-[18px]"
              alt="LinkedIn"
            />
            Continue with LinkedIn
          </button>

        </div>

        <div className="flex items-center gap-2 py-6 text-sm text-slate-500">
          <div className="h-px w-full bg-slate-200"></div>
          OR
          <div className="h-px w-full bg-slate-200"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="email"
            placeholder="Email Address "
            className="w-full placeholder:text-gray-500 text-black rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full placeholder:text-gray-500 text-black rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            required
          />

          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              Reset your password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-2.5 text-white hover:bg-gray-900"
          >
            Continue
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?
          <a href="/signup" className="ml-1 font-medium text-blue-600">
            Sign up
          </a>
        </div>

      </div>

    </div>

  )
}

export default Login
