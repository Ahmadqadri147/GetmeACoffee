"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UserProfilePage = ({ params }) => {
  const resolvedParams = React.use(params);
  const { username } = resolvedParams;
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  // Fetch user profile from DB
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile?username=${username}`);
        const data = await res.json();
        if (data.success) {
          setProfile(data.user);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [username]);

  // Fetch payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`/api/payments/${username}`);
        const data = await res.json();
        if (data.success) {
          setPayments(data.payments);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoadingPayments(false);
      }
    };

    fetchPayments();
  }, [username]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuickSelect = (amt) => {
    setFormData({ ...formData, amount: String(amt) });
  };

  const handlePayment = async () => {
    const { name, message, amount } = formData;

    if (!name || !message || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch("/api/fake-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          to_user: username,
          message,
          amount: numAmount,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push(
          `/payment-success?order_id=${data.order_id}&txn_id=${data.transaction_id}&username=${username}`
        );
      } else {
        router.push("/payment-failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      router.push("/payment-failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // Dynamic values from profile (with fallbacks)
  const displayName =
    profile?.name ||
    username.charAt(0).toUpperCase() + username.slice(1);
  const displayBio = profile?.bio || "Creating amazing content ✨";
  const displayProfilePic =
    profile?.profilepic || "/coffee.gif";
  const displayCoverPic =
    profile?.coverpic || "/coverimg.jpg";

  return (
    <div className="min-h-screen">
      {/* Cover + Profile Picture */}
      <div className="relative h-48 sm:h-64 md:h-96">
        {loadingProfile ? (
          <div className="w-full h-full bg-gray-800 animate-pulse" />
        ) : (
          <img
            src={displayCoverPic}
            alt="Cover Image"
            className="w-full h-full object-cover"
          />
        )}

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          {loadingProfile ? (
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-gray-700 animate-pulse border-4 border-indigo-950" />
          ) : (
            <div className="relative group">
              <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-25"></div>
              <img
                src={displayProfilePic}
                alt="Profile"
                className="relative w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-indigo-950 object-cover shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-16 md:pt-24 text-center px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
          {displayName}!
        </h1>
        <p className="text-blue-200 mt-2 text-sm md:text-base opacity-75">
          Connecting creators with their community 💙
        </p>
      </div>

      {/* About Section */}
      <div className="mt-8 px-4">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/5 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] text-center shadow-xl">
          <h2 className="text-lg md:text-xl font-bold text-amber-500 uppercase tracking-widest mb-4">
            — About —
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
            {displayBio}
          </p>

          {/* Social Links */}
          {profile && (profile.instagram || profile.twitter || profile.linkedin) && (
            <div className="flex flex-wrap justify-center gap-3">
              {profile.instagram && (
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-pink-600/10 border border-pink-500/20 text-pink-400 text-xs font-bold hover:bg-pink-600/20 transition flex items-center gap-2"
                >
                  📸 Instagram
                </a>
              )}
              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-sky-600/10 border border-sky-500/20 text-sky-400 text-xs font-bold hover:bg-sky-600/20 transition flex items-center gap-2"
                >
                  🐦 Twitter
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold hover:bg-blue-600/20 transition flex items-center gap-2"
                >
                  💼 LinkedIn
                </a>
              )}
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-black text-white">{payments.length}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Payments</p>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="text-center">
              <p className="text-2xl font-black text-blue-400">${payments.reduce((total, payment) => total + payment.amount, 0)}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Raised</p>
            </div>
          </div>
        </div>
      </div>

      {/* Supporters + Payment Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">
            Support the Journey 💙
          </h2>
          <p className="text-blue-300/60 text-sm md:text-base">
            Every coffee fuels the creativity and helps this profile grow.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Supporters */}
          <div className="bg-white/5 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 border border-white/5 flex flex-col min-h-[400px]">
            <h3 className="text-xl font-bold text-blue-400 mb-8 flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              Recent Supporters
            </h3>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {loadingPayments ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 italic animate-pulse">Loading community...</p>
                </div>
              ) : (
                <>
                  {payments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2">
                      <span className="text-4xl">💎</span>
                      <p>Be the first to support!</p>
                    </div>
                  ) : (
                    payments.map((payment, index) => (
                      <div
                        key={payment._id || index}
                        className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold shrink-0">
                            {payment.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-blue-100 font-bold text-sm truncate">
                              {payment.name} <span className="text-blue-400/60 font-normal">donated</span> ${payment.amount}
                            </p>
                            <p className="text-gray-400 text-xs italic mt-1 line-clamp-2">
                              &quot;{payment.message}&quot;
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-gradient-to-br from-blue-600/10 to-indigo-700/10 backdrop-blur-sm rounded-[2rem] p-6 md:p-10 border border-blue-500/10 flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2">Buy a Coffee ☕</h3>
            <p className="text-sm text-blue-300 opacity-60 mb-8">Support {displayName} with a small contribution.</p>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name (Optional)"
                disabled={isProcessing}
                className="w-full px-5 py-4 rounded-2xl bg-indigo-950/40 border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="A warm message..."
                rows="3"
                disabled={isProcessing}
                className="w-full px-5 py-4 rounded-2xl bg-indigo-950/40 border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition resize-none"
              />

              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg text-blue-500 font-bold">$</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  disabled={isProcessing}
                  className="w-full pl-10 px-5 py-4 rounded-2xl bg-indigo-950/40 border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition font-bold"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="mt-8 w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black tracking-widest uppercase shadow-xl shadow-blue-900/40 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Send Coffee "
              )}
            </button>

            <div className="mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px bg-white/5 flex-1"></div>
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">Quick Support</span>
                <div className="h-px bg-white/5 flex-1"></div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[5, 10, 20, 50].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handleQuickSelect(amt)}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${Number(formData.amount) === amt
                      ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20"
                      : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    ${amt}
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
