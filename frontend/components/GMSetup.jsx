// components/GMSetup.js
import { useState } from "react";
import { useGame } from "../context/GameContext";

export default function GMSetup() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const { startSession } = useGame();

  const handleSubmit = (e) => {
    e.preventDefault();
    startSession(q.trim(), a.trim());
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/25 text-left">
      <h3 className="font-bold text-white text-xl mb-1">Craft This Round</h3>
      <p className="text-sm text-slate-200/80 mb-4">
        Define the clue and answer pair for everyone else to crack.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          placeholder="Question prompt"
          className="w-full p-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder:text-white/40 outline-none focus:border-cyan-300"
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          placeholder="Answer key"
          className="w-full p-3 rounded-xl border border-white/30 bg-white/10 text-white placeholder:text-white/40 outline-none focus:border-cyan-300"
          onChange={(e) => setA(e.target.value)}
        />
        <button
          className="w-full bg-cyan-400 cursor-pointer text-slate-900 py-3 rounded-xl font-bold disabled:bg-slate-500 disabled:text-slate-300 disabled:pointer-events-none hover:bg-cyan-300 transition"
          disabled={!q || !a}
        >
          Launch Round
        </button>
      </form>
    </div>
  );
}
