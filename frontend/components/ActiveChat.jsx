// components/ActiveChat.js
import { useEffect, useState } from "react";
import { useGame } from "../context/GameContext";
import Scoreboard from "./ScoreBoard";
import { playSound } from "@/utils/audioManager";

export default function ActiveChat() {
  const { gameState, me, sendGuess } = useGame();

  const [text, setText] = useState("");
  const [isScoreboardOpen, setIsScoreboardOpen] = useState(false);

  const isGM = me.id === gameState.gameMaster;
  const canGuess = !isGM && me.attempts > 0 && gameState.status === "PLAYING";

  useEffect(() => {
    if (!me) {
      return;
    }
    if (
      gameState.timeLeft <= 10 &&
      gameState.timeLeft > 0 &&
      gameState.status === "PLAYING"
    ) {
      playSound("tick");
    }
  }, [gameState.timeLeft, gameState.status, me]);

  const handleSendMessage = () => {
    if (text.trim() && canGuess) {
      sendGuess(text);
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const isUrgent = gameState.timeLeft <= 10;

  const isSpectator = me.spectating || !me.activeInRound;

  return (
    <>
      <div className="w-full md:w-fit md:min-w-1/3 flex flex-col h-screen max-w-3xl mx-auto glass-panel border-x border-white/20 shadow-[0_20px_90px_rgba(0,0,0,0.4)] rise-in">
        {/* 1. Header: Question & Timer */}
        <div className="p-5 border-b border-white/15 flex justify-between items-center bg-black/20 text-white shadow-md w-full z-10">
          <div className="flex-1">
            <p className="arena-heading text-[10px] text-cyan-300/90">
              Live Prompt
            </p>

            <h2 className="font-bold text-lg leading-tight mt-1">
              {gameState.question}
            </h2>
            <span className="mt-2 inline-flex bg-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold items-center gap-1 border border-white/20">
              Players {gameState.players.length}
            </span>
          </div>
          <div
            className={`
    font-mono font-bold text-2xl ml-4 px-3 py-1 rounded-lg transition-all duration-300
    ${
      isUrgent
        ? "bg-amber-300 text-slate-950 animate-pulse scale-110 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
        : "bg-white/10 text-white border border-white/20"
    }
  `}
          >
            {gameState.timeLeft}s
          </div>
        </div>
        {/* </div> */}

        {/* 2. Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {gameState.messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.userId === me.id ? "items-end" : "items-start"}`}
            >
              <span className="text-[10px] text-white/55 mb-1 px-2">
                {msg.userName}
              </span>
              <div
                className={`p-3 rounded-2xl max-w-[85%] shadow-sm ${
                  msg.userId === me.id
                    ? "bg-cyan-300 text-slate-950 rounded-tr-none"
                    : "bg-white/12 border border-white/25 text-white rounded-tl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 3. Input Controller */}
        <div className="p-4 bg-black/20 border-t border-white/15 sticky bottom-0">
          {isSpectator ? (
            <div className="bg-amber-300/15 border border-amber-200/40 p-3 rounded-lg text-center">
              <p className="text-amber-200 font-medium text-sm">
                Round in progress! You are spectating. 🍿
              </p>
              <p className="text-xs text-amber-100/80 mt-1">
                You&apos;ll be added to the next round in {gameState.timeLeft}s
              </p>
            </div>
          ) : canGuess ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your guess here..."
                  className="flex-1 p-3 rounded-xl border border-white/30 bg-white/8 focus:border-cyan-300 outline-none transition-colors placeholder:text-white/40 text-white"
                  autoFocus
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-cyan-300 hover:bg-cyan-200 text-slate-950 px-6 rounded-xl font-bold transition-all active:scale-95"
                >
                  Send
                </button>
              </div>
              <div className="flex justify-between items-center px-1">
                <p className="text-xs text-white/70">
                  Remaining attempts:{" "}
                  <span className="font-bold text-cyan-300">
                    {me.attempts}/3
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 bg-white/8 rounded-xl border border-dashed border-white/30">
              <p className="text-sm text-white/80 font-medium italic">
                {isGM
                  ? "📢 You are the GM. Monitoring player guesses..."
                  : "🔒 Out of attempts. You are spectating."}
              </p>
            </div>
          )}
          <button
            onClick={() => setIsScoreboardOpen(true)}
            className="flex mt-2 items-center gap-1 text-xs font-bold text-cyan-300 cursor-pointer hover:underline"
          >
            View Live Scores
          </button>
        </div>
      </div>
      <Scoreboard
        isOpen={isScoreboardOpen}
        onClose={() => setIsScoreboardOpen(false)}
      />{" "}
      {/* Placeholder for Scoreboard modal */}
    </>
  );
}
