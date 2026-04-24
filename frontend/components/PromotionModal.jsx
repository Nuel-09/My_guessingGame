// components/PromotionModal.js
import { useGame } from "../context/GameContext";

export default function PromotionModal() {
  const { gameState, me, socket } = useGame();

  // Only show this if the server has flagged THIS specific player as the "Candidate"
  if (gameState?.pendingGM !== me.id) {
    return null;
  }

  const handleDecision = (accept) => {
    // Send the decision back to Express
    socket.emit("gm_decision", { accept });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <div className="glass-panel rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-6 border border-white/30 rise-in">
        <p className="arena-heading text-xs text-cyan-300">Promotion Notice</p>
        <div>
          <h2 className="text-2xl font-black text-white">
            It&apos;s Your Turn!
          </h2>
          <p className="text-slate-200/80 mt-2">
            The group needs a new Game Master. Do you want to lead the next
            round?
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleDecision(true)}
            className="w-full bg-cyan-300 hover:bg-cyan-200 text-slate-900 font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            Yes, I&apos;ll do it! ✍️
          </button>
          <button
            onClick={() => handleDecision(false)}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-2xl transition-all border border-white/20"
          >
            Pass to someone else
          </button>
        </div>
      </div>
    </div>
  );
}
