import React from "react";
export default function Topbar() {
  return (
    <header className="topbar flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow">
      <div className="text-lg font-bold tracking-wider">🚀 AI Crypto Dashboard</div>
      <div className="flex items-center gap-4">
        <span className="text-blue-300 font-semibold">Welkom Marcel!</span>
        <span className="bg-blue-600 px-4 py-1 rounded-full text-white text-xs">Beta</span>
      </div>
    </header>
  );
}
