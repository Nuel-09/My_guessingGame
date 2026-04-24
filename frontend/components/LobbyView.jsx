// components/LobbyView.js
import { useGame } from "../context/GameContext";
import GMSetup from "./GMSetup";

export default function LobbyView() {
  const { gameState, me } = useGame();
  const isGM = me.id === gameState.gameMaster;
  const canStart = gameState.players.length >= 3;

  return (
    <div className="max-w-3xl mx-auto p-6 text-center rise-in">
      <div className="flex flex-col items-center mb-6">
        <p className="arena-heading text-xs text-cyan-300">Control Room</p>
        <h2 className="mt-2 text-4xl font-black text-white">
          Players In Queue
        </h2>
        <div className="mt-3 px-4 py-1.5 glass-panel rounded-full text-xs font-bold flex items-center gap-2 text-cyan-200">
          <span>Live count</span>
          <span className="text-white">{gameState.players.length}</span>
        </div>
      </div>

      <div className="glass-panel rounded-2xl p-6 mb-6 border border-white/20">
        <ul className="space-y-2">
          {gameState.players.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/15"
            >
              <span className="text-white/90 font-medium">
                {p.name} {p.id === me.id && "(You)"}
              </span>
              {p.id === gameState.gameMaster && (
                <span className="text-cyan-300 font-semibold text-sm">
                  Game Master
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {isGM ? (
        canStart ? (
          <GMSetup />
        ) : (
          <p className="text-amber-300 font-medium animate-pulse">
            Waiting for more players to join (Min. 3)
          </p>
        )
      ) : (
        <p className="text-cyan-200">
          Waiting for the Game Master to start... ⏳
        </p>
      )}
    </div>
  );
}
