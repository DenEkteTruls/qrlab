
import Navbar from "../components/Navbar";

export default function HowTo() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden" style={{ fontFamily: 'Satoshi-Variable, sans-serif' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/60">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgb(99 102 241 / 0.05) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgb(139 92 246 / 0.05) 0%, transparent 50%)`,
        }}></div>
      </div>

      {/* Container with max width */}
      <div className="max-w-[1100px] mx-auto relative">
        {/* Navigation */}
        <Navbar />

        <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
            <h1>HOW-TO PAGE</h1>
        </div>
    </div>
    </div>
  );
}