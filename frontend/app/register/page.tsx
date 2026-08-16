"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

function UserIcon() {
  return (
    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-3.3 3.2-5 7-5s6.3 1.7 7 5" />
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

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({ name, email, password });
      router.push("/login");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <header className="auth-header">
        <a href="/register" className="brand">
          <span className="brand-mark">
            <LockIcon />
          </span>
          Login System
        </a>

        <div className="auth-header-right">
          <span>Already have an account?</span>
          <a href="/login" className="auth-header-link">
            Login
          </a>
        </div>
      </header>

      <main className="auth-main">
        <section className="auth-card">
          <div className="auth-icon">
            <UserIcon />
          </div>

          <h1 className="auth-title">Create your account</h1>

          <p className="auth-subtitle">
            Join us today. It only takes a few seconds to get started.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="field">
              <span className="field-label">Full name</span>

              <span className="field-wrap">
                <span className="field-icon">
                  <UserIcon />
                </span>

                <input
                  className="field-input"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </span>
            </label>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </span>

              <span className="field-hint">
                Password must be at least 8 characters.
              </span>
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button
              className="primary-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <div className="auth-legal">
              By creating an account, you agree to our{" "}
              <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}