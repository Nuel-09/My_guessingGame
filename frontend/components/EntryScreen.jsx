// components/EntryScreen.js
import { useState } from "react";
import { useGame } from "../context/GameContext";

export default function EntryScreen() {
  const [name, setName] = useState("");
  const { joinGame } = useGame();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) joinGame(name);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <div className="glass-panel rise-in w-full max-w-md rounded-3xl p-8 shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
        <p className="arena-heading text-xs text-cyan-300/90">Signal Hunt Arena</p>
        <h1 className="mt-3 text-4xl font-black text-white leading-tight">
          Decode The
          <span className="block text-cyan-300">Room Challenge</span>
        </h1>
        <p className="mt-2 text-sm text-slate-200/80">
          Enter a codename and join a live round of bluff, speed, and sharp
          guessing.
        </p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="text"
            placeholder="Enter your codename (15 chars max)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-cyan-300"
            maxLength={15}
            autoFocus
          />
          <button className="w-full rounded-xl bg-cyan-400 py-3 font-bold text-slate-900 transition hover:bg-cyan-300">
            Enter Arena
          </button>
        </form>
      </div>
    </div>
  );
}
