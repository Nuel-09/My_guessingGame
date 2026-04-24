// components/ResultsView.js
import { useGame } from "../context/GameContext";

export default function ResultsView() {
  const { gameState, me } = useGame();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6 rise-in">
      <div className="glass-panel max-w-xl rounded-3xl px-8 py-10 border border-white/20">
        <p className="arena-heading text-xs text-cyan-300 mb-2">
          Round Summary
        </p>
        <h1 className="text-4xl mb-4 text-white font-black">
          {gameState.winner
            ? gameState.winner.id === me.id
              ? "You have won"
              : "Winner locked in"
            : "Time is up"}
        </h1>
        {gameState.winner && (
          <div className="bg-cyan-300/15 border border-cyan-200/30 p-6 rounded-2xl mb-4">
            <p className="text-lg font-bold text-cyan-100">
              {gameState.winner?.id === me.id
                ? "Clean hit. You cracked the answer first."
                : `${gameState.winner.name} earned 10 points.`}
            </p>
          </div>
        )}
        {gameState.winner?.id !== me.id && (
          <p className="text-slate-200/90">
            The answer was:{" "}
            <span className="font-bold text-white">{gameState.answer}</span>
          </p>
        )}
        <p className="mt-8 text-cyan-300 text-sm animate-pulse">
          Preparing next round...
        </p>
      </div>
    </div>
  );
}
