"use client";

import Image from "next/image";
import '../../public/Fonts/WEB/css/satoshi.css';

import Navbar from "./components/Navbar";
import QRGenerator from "./components/QRGenerator";

export default function Home() {
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

        {/* Hero Section */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
          <div className="max-w-4xl mx-auto relative z-20">
            <h1 
              className="text-6xl md:text-8xl font-bold mb-6 text-slate-900 leading-tight tracking-tight" 
              style={{ fontFamily: 'Satoshi-Black' }}
            >
              Lag en QR-kode eller lenke for alt
            </h1>
            <p 
              className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed" 
              style={{ fontFamily: 'Satoshi-Regular' }}
            >
              Den enkleste måten å dele alt på. Lag QR-koder for nettsider, filer, kontaktinfo, wifi og mer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="px-8 py-4 bg-slate-900 text-white text-lg rounded-xl hover:bg-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg" 
                style={{ fontFamily: 'Satoshi-Bold' }}
              >
                Start Gratis
              </button>
              <button 
                className="px-8 py-4 border-2 border-slate-200 text-slate-700 text-lg rounded-xl hover:border-slate-300 hover:bg-slate-50 transform hover:scale-105 transition-all duration-200" 
                style={{ fontFamily: 'Satoshi-Medium' }}
              >
                Se hvordan det virker
              </button>
            </div>
          </div>
        </div>

        {/* Generator Section */}
        <QRGenerator />

        {/* CTA Section */}
        <div className="relative z-10 px-6 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-sm">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-slate-900" 
                style={{ fontFamily: 'Satoshi-Bold' }}
              >
                Klar til å komme i gang?
              </h2>
              <p 
                className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto" 
                style={{ fontFamily: 'Satoshi-Regular' }}
              >
                Opprett din første QR-kode i dag. Ingen kredittkort nødvendig.
              </p>
              <button 
                className="px-8 py-4 bg-slate-900 text-white text-lg rounded-xl hover:bg-slate-800 transform hover:scale-105 transition-all duration-200 shadow-lg" 
                style={{ fontFamily: 'Satoshi-Bold' }}
              >
                Start gratis nå
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
