"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/api";

function LockIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser({ email, password });
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Login failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <header className="auth-header">
        <a href="/login" className="brand">
          <span className="brand-mark">
            <LockIcon />
          </span>
          Login System
        </a>

        <div className="auth-header-right">
          <span>Don&apos;t have an account?</span>
          <a href="/register" className="auth-header-link">
            Register
          </a>
        </div>
      </header>

      <main className="auth-main">
        <section className="auth-card">
          <div className="auth-icon">
            <LockIcon />
          </div>

          <h1 className="auth-title">Welcome back</h1>

          <p className="auth-subtitle">
            Sign in to continue to your account.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="field-label">Email address</span>

              <span className="field-wrap">
                <span className="field-icon">
                  <MailIcon />
                </span>

                <input
                  className="field-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </span>
            </label>

            <label className="field">
              <span className="field-label">Password</span>

              <span className="field-wrap">
                <span className="field-icon">
                  <LockIcon />
                </span>

                <input
                  className="field-input"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
              </span>
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="auth-legal">
              By signing in, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}