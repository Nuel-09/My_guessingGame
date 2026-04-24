"use client";
import { useGame } from "../context/GameContext";
import EntryScreen from "../components/EntryScreen";
import LobbyView from "../components/LobbyView";
import ActiveChat from "../components/ActiveChat";
import ResultsView from "@/components/ResultsView";
import PromotionModal from "@/components/PromotionModal";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const { gameState, me, leaveGame, isConnecting } = useGame();

  if (isConnecting) return <LoadingScreen />;

  if (!me) return <EntryScreen />;

  return (
    <>
      <div className="relative min-h-screen ambient-grid">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
        {/* Persistent Leave Button - Visible on all game states */}
        <button
          onClick={() => {
            if (confirm("Leave game?")) leaveGame();
          }}
          className="fixed bottom-6 right-6 z-[70] h-11 px-4 glass-panel rounded-full flex items-center justify-center text-white/80 hover:text-white hover:border-white/50 transition-all active:scale-95 cursor-pointer gap-2"
          title="Leave Game"
        >
          <span className="text-xs font-semibold tracking-wide">Exit</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
        <PromotionModal /> {/* Always watching for the 'pendingGM' flag */}
        {gameState?.status === "LOBBY" && <LobbyView />}
        {gameState?.status === "PLAYING" && <ActiveChat />}
        {gameState?.status === "ENDED" && <ResultsView />}
        {/* Fallback for when the room is closed */}
        {gameState?.status === "CLOSED" && (
          <div className="h-screen flex items-center justify-center text-center p-10">
            <div className="glass-panel rounded-3xl px-10 py-8 max-w-lg rise-in">
              <p className="arena-heading text-xs text-cyan-300 mb-3">Session Closed</p>
              <h1 className="text-xl font-bold text-white">{gameState.reason}</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
