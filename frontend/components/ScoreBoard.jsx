// components/Scoreboard.js
import { useGame } from "../context/GameContext";

export default function Scoreboard({ isOpen, onClose }) {
  const { gameState } = useGame();

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/55 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Content */}
      <div
        className={`
        relative w-full max-w-xs glass-panel h-full shadow-2xl flex flex-col border-l border-white/20
        transition-transform duration-300 ease-in-out transform
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="p-6 border-b border-white/15 flex justify-between items-center bg-black/20 text-white">
          <h2 className="text-xl font-bold">Leaderboard</h2>
          <button onClick={onClose} className="text-2xl font-bold">
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-3">
            {[...gameState.players]
              .sort((a, b) => b.score - a.score)
              .filter((p) => p.activeInRound) // Sort by highest score
              .map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-white/20 bg-white/8 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-cyan-300">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-bold text-white">{player.name}</p>
                      <p className="text-[10px] text-slate-300/70 uppercase font-semibold">
                        {player.id === gameState.gameMaster
                          ? "Game Master"
                          : `${player.attempts} attempts left`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-cyan-300">
                      {player.score}
                    </p>
                    <p className="text-[8px] text-slate-300/70 uppercase font-bold">
                      Points
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="p-6 bg-black/20 border-t border-white/15 text-center">
          <p className="text-xs text-slate-300/70">
            Winning a round adds 10 points!
          </p>
        </div>
      </div>
    </div>
  );
}
