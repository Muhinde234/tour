"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import { Eye, EyeOff, Lock } from "lucide-react";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    setLoading(false);

    if (authError) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f1e3c] p-4 font-sans">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Top orange bar */}
        <div className="h-1.5 w-full bg-[#f2a33c]" />

        <div className="p-8">
          {/* Logo + title */}
          <div className="mb-8 flex flex-col items-center text-center">
            <Image src="/images/logo.png" alt="ETTA" width={52} height={52} className="mb-4" />
            <h1 className="text-xl font-black text-[#0f1e3c]">Admin Dashboard</h1>
            <p className="mt-1 text-xs text-gray-400">Sign in to manage your website content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@emmatourtravel.com"
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 transition focus:border-[#f2a33c] focus:bg-white focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-gray-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-11 text-sm text-gray-900 placeholder:text-gray-300 transition focus:border-[#f2a33c] focus:bg-white focus:outline-none"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-500">
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2a33c] py-3.5 text-sm font-bold text-white transition hover:bg-[#0f1e3c] disabled:opacity-60">
              <Lock className="h-4 w-4" />
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>

        <div className="border-t border-gray-100 px-8 py-4 text-center text-[11px] text-gray-400">
          EMMA TOUR AND TRAVEL AGENCY — Admin Panel
        </div>
      </div>
    </div>
  );
}
