"use client";

import React, { useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation';

const Login = () => {

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // Redirect to dashboard if new, otherwise to their profile page
      if (session.user.isNewUser) {
        router.replace("/dashboard?from=login");
      } else {
        router.replace(`/${session.user.username}`);
      }
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

    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            Sign in to your account to continue ☕
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => signIn("github")}
            className="group relative w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              className="h-6 w-6"
              alt="GitHub"
            />
            <span>Continue with GitHub</span>
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>

          <button
            onClick={() => signIn("google")}
            className="group relative w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg backdrop-blur-sm"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="h-6 w-6"
              alt="Google"
            />
            <span>Continue with Google</span>
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>
        </div>

        <div className="flex items-center gap-4 my-10">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">secure gateway</span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-xs text-gray-500 max-w-[250px] mx-auto leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="pt-4 flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-400">New here?</span>
            <a href="/" className="text-blue-400 font-bold hover:underline">Go back home</a>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Login
