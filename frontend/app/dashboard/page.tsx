"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/lib/api";

type User = {
  id: string;
  name: string;
  email: string;
};

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m3 10 9-7 9 7" />
      <path d="M5 9v11h14V9" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.7-3.3 3.2-5 7-5s6.3 1.7 7 5" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.6 1.6-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2H11v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.6-1.6.1-.1A1.7 1.7 0 0 0 6.8 15a1.7 1.7 0 0 0-1.5-1H5.1v-2.2h.2a1.7 1.7 0 0 0 1.5-1A1.7 1.7 0 0 0 6.5 9l-.1-.1L8 7.3l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V6h2.2v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.6 1.6-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v2.2h-.2a1.7 1.7 0 0 0-1.5.9Z" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M21 3v18" />
    </svg>
  );
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [router]);

  async function handleLogout() {
    try {
      await logoutUser();
    } finally {
      router.replace("/login");
    }
  }

  if (loading) {
    return (
      <div className="auth-page">
        <main className="auth-main">
          <div>Loading your account...</div>
        </main>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <a href="/dashboard" className="brand">
            <span className="brand-mark">
              <LockIcon />
            </span>
            Login System
          </a>
        </div>

        <nav className="dashboard-nav">
          <a className="dashboard-nav-item active" href="/dashboard">
            <HomeIcon />
            Dashboard
          </a>

          <a className="dashboard-nav-item" href="#">
            <UserIcon />
            Profile
          </a>

          <a className="dashboard-nav-item" href="#">
            <SettingsIcon />
            Settings
          </a>

          <button className="dashboard-nav-item logout" onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </button>
        </nav>
      </aside>

      <section className="dashboard-content">
        <header className="dashboard-topbar">
          <div className="user-pill">
            <div className="avatar">{initials}</div>

            <span className="user-pill-name">
              {user.name}
            </span>
          </div>
        </header>

        <main className="dashboard-main">
          <div className="dashboard-heading">
            <h1>Dashboard</h1>
            <p>Welcome back. Here&apos;s an overview of your account.</p>
          </div>

          <section className="welcome-card">
            <p className="welcome-eyebrow">Welcome back,</p>
            <h2>{user.name}</h2>
            <p>Glad to see you again.</p>
          </section>

          <div className="dashboard-grid">
            <section className="dashboard-panel">
              <h2 className="panel-title">Account Overview</h2>

              <div className="account-row">
                <div className="account-label">Name</div>
                <div className="account-value">{user.name}</div>
              </div>

              <div className="account-row">
                <div className="account-label">Email</div>
                <div className="account-value">{user.email}</div>
              </div>

              <div className="account-row">
                <div className="account-label">Account ID</div>
                <div className="account-value">{user.id}</div>
              </div>
            </section>

            <section className="dashboard-panel">
              <h2 className="panel-title">Quick Actions</h2>

              <div className="quick-actions">
                <div className="quick-action">
                  <p className="quick-action-title">Edit Profile</p>
                  <p className="quick-action-description">
                    Update your personal information.
                  </p>
                </div>

                <div className="quick-action">
                  <p className="quick-action-title">Security</p>
                  <p className="quick-action-description">
                    Manage your account security.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </section>
    </div>
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