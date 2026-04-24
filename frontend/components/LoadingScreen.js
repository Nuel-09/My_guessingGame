// components/LoadingScreen.js
export default function LoadingScreen() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6">
      {/* Animated Spinner */}
      <div className="glass-panel rounded-3xl p-10 text-center rise-in">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 border-4 border-white/25 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-cyan-300 rounded-full border-t-transparent animate-spin"></div>
        </div>

        <h2 className="mt-8 text-xl font-bold text-white animate-pulse">
          Syncing with arena...
        </h2>
        <p className="text-sm text-slate-300/70 mt-2">Restoring your station</p>
      </div>
    </div>
  );
}
