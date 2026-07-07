"use client";

import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Scissors, AlertCircle, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "ravishkapravindika99@gmail.com";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const provider = new GoogleAuthProvider();
      // Optional: prompt selection if they have multiple accounts
      provider.setCustomParameters({
        prompt: "select_account",
      });
      
      const result = await signInWithPopup(auth, provider);

      // Enforce single admin email
      if (result.user.email !== ADMIN_EMAIL) {
        await auth.signOut();
        setErrorMsg(
          `Access denied. This admin panel is only accessible to ${ADMIN_EMAIL}.`
        );
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error(err);
      // Ignore if user just closed the popup
      if (err.code === "auth/popup-closed-by-user") {
        setErrorMsg("");
      } else {
        setErrorMsg("Sign-in failed. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Scissors className="w-7 h-7 text-black" />
          </motion.div>
          <h1 className="font-serif text-3xl font-bold text-white">T.K. Tailors</h1>
          <p className="text-white/40 text-xs mt-1.5 tracking-[0.2em] uppercase">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="font-serif text-2xl font-bold text-[#111111] mb-1">
            Welcome back
          </h2>
          <p className="text-sm text-[#6B7280] mb-7">
            Sign in with your Google account to access the admin panel.
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold text-sm rounded-xl hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-t-transparent border-gray-700 rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </>
            )}
          </button>

          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5 flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-700 text-xs px-4 py-3.5 rounded-xl"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>{errorMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-[10px] text-center text-gray-400 mt-6 leading-relaxed">
            This panel is restricted to authorized administrators only.
            <br />
            Unauthorized access attempts are logged.
          </p>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          © {new Date().getFullYear()} T.K. Tailors. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
