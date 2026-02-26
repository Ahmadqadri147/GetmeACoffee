"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const DashboardContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const isFromLogin = searchParams.get("from") === "login";

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilepic: "",
    coverpic: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  const [profilePreview, setProfilePreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Fetch existing profile data on mount
  useEffect(() => {
    if (status !== "authenticated") return;

    // If session is ready but username is not available yet, stop loading anyway
    if (!session?.user?.username) {
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `/api/profile?username=${session.user.username}`
        );
        const data = await res.json();

        if (data.success && data.user) {
          const u = data.user;

          // Smart redirect: only auto-redirect to profile if user came from login
          // If user navigated to /dashboard directly (e.g. from navbar), always show the form
          if (isFromLogin && u.bio && u.bio.trim()) {
            router.replace(`/${session.user.username}`);
            return;
          }

          setFormData({
            name: u.name || "",
            bio: u.bio || "",
            profilepic: u.profilepic || "",
            coverpic: u.coverpic || "",
            instagram: u.instagram || "",
            twitter: u.twitter || "",
            linkedin: u.linkedin || "",
          });
          setProfilePreview(u.profilepic || session.user.image || "");
          setCoverPreview(u.coverpic || "/coverimg.jpg");
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [status, session, isFromLogin, router]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showToast("Image must be under 2MB", "error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setFormData((prev) => ({ ...prev, [field]: base64 }));
      if (field === "profilepic") setProfilePreview(base64);
      if (field === "coverpic") setCoverPreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        showToast("Profile saved successfully! Redirecting...");
        setTimeout(() => {
          router.push(`/${session.user.username}`);
        }, 1000);
      } else {
        showToast(data.error || "Failed to save profile", "error");
        setIsSaving(false);
      }
    } catch (err) {
      console.error("Save error:", err);
      showToast("Something went wrong. Please try again.", "error");
      setIsSaving(false);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg
            className="animate-spin h-10 w-10 text-blue-400 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-blue-300 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-xl shadow-2xl text-white font-semibold transition-all duration-300 ${toast.type === "error"
            ? "bg-red-600/90 border border-red-400"
            : "bg-green-600/90 border border-green-400"
            }`}
        >
          {toast.type === "error" ? "❌" : "✅"} {toast.message}
        </div>
      )}

      <div className="px-4 py-8 md:py-12">
        <div className="relative mb-8 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-center c6 px-4">
            Welcome to Your Dashboard, {session?.user?.name}!
          </h1>
        </div>

        <div className="max-w-4xl mx-auto bg-violet-900/40 backdrop-blur-xl text-white p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-white/10 shadow-2xl">
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-center c5 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
            Complete Your Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-sm text-gray-300 font-medium ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-3.5 rounded-xl bg-indigo-950/50 border border-gray-700/50 focus:outline-none focus:border-blue-500/50 transition shadow-inner"
                />
              </div>

              {/* Username (read-only) */}
              <div className="space-y-2">
                <label className="block text-sm text-gray-300 font-medium ml-1">
                  Username
                </label>
                <input
                  type="text"
                  value={session?.user?.username || ""}
                  readOnly
                  className="w-full p-3.5 rounded-xl bg-indigo-900/20 border border-gray-700/30 text-gray-500 cursor-not-allowed shadow-inner"
                />
                <p className="text-[10px] text-gray-500 uppercase tracking-widest ml-1">
                  Username cannot be changed
                </p>
              </div>
            </div>

            {/* Profile Picture */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <label className="block mb-4 text-sm text-gray-400 font-medium lowercase tracking-wider">
                — Profile Picture
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500 to-fuchsia-500 rounded-full blur opacity-25 group-hover:opacity-50 transition"></div>
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile Preview"
                      className="relative w-24 h-24 rounded-full object-cover border-4 border-indigo-950 shadow-xl"
                    />
                  ) : (
                    <div className="relative w-24 h-24 rounded-full bg-indigo-950 border-4 border-indigo-900 flex items-center justify-center text-3xl">
                      👤
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full text-center sm:text-left">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "profilepic")}
                    className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-blue-600/20 file:text-blue-400 hover:file:bg-blue-600/30 transition cursor-pointer"
                  />
                  <p className="text-[10px] text-gray-500 mt-3 italic">
                    Max size 2MB. Leave empty to use your GitHub/Google avatar.
                  </p>
                </div>
              </div>
            </div>

            {/* Cover Picture */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
              <label className="block mb-4 text-sm text-gray-400 font-medium lowercase tracking-wider">
                — Cover Image
              </label>
              <div className="space-y-4">
                {coverPreview && (
                  <div className="relative h-32 md:h-48 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <img
                      src={coverPreview}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "coverpic")}
                  className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-pink-600/20 file:text-pink-400 hover:file:bg-pink-600/30 transition cursor-pointer"
                />
                <p className="text-[10px] text-gray-500 italic">
                  Recommended: 1200x400. Default background will be used if left empty.
                </p>
              </div>
            </div>

            {/* About */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-300 font-medium ml-1">
                Your Bio / Mission
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell your fans about your journey and what you're creating..."
                rows="5"
                className="w-full p-4 rounded-xl bg-indigo-950/50 border border-gray-700/50 focus:outline-none focus:border-blue-500/50 transition shadow-inner resize-none"
              />
            </div>

            {/* Social Links */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-px bg-white/10 flex-1"></div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
                  Social Presence
                </h3>
                <div className="h-px bg-white/10 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 opacity-50">📸</div>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                    className="w-full pl-10 p-3 rounded-xl bg-indigo-950/50 border border-gray-700/50 focus:outline-none focus:border-pink-500/50 transition text-sm"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 opacity-50">🐦</div>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="Twitter URL"
                    className="w-full pl-10 p-3 rounded-xl bg-indigo-950/50 border border-gray-700/50 focus:outline-none focus:border-blue-400/50 transition text-sm"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 opacity-50">💼</div>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="LinkedIn URL"
                    className="w-full pl-10 p-3 rounded-xl bg-indigo-950/50 border border-gray-700/50 focus:outline-none focus:border-blue-600/50 transition text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-blue-950/50 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSaving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Saving Changes...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Update Profile <span className="text-xl group-hover:translate-x-1 transition-transform"></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center animate-pulse">
          <div className="text-4xl mb-4">☕</div>
          <p className="text-blue-300">Preparing your dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
};

export default Dashboard;
