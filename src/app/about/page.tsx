"use client";

import Navbar from '../components/Navbar';
import '../../../public/Fonts/WEB/css/satoshi.css';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: 'Satoshi-Variable, sans-serif' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/60">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgb(99 102 241 / 0.05) 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, rgb(139 92 246 / 0.05) 0%, transparent 50%)`,
        }}></div>
      </div>

      {/* Container with max width */}
      <div className="max-w-[1400px] mx-auto relative">
        <Navbar />

        {/* Hero Section */}
        <div className="relative z-10 px-6 pt-20 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 leading-tight tracking-tight" 
              style={{ fontFamily: 'Satoshi-Black' }}
            >
              Om QRLab
            </h1>
            <p 
              className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed" 
              style={{ fontFamily: 'Satoshi-Regular' }}
            >
              Vi gjør det enkelt å dele alt digitalt. QRLab er den moderne løsningen for å koble fysisk og digital verden sammen.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="relative z-10 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-6 text-slate-900" 
                  style={{ fontFamily: 'Satoshi-Bold' }}
                >
                  Vårt oppdrag
                </h2>
                <p 
                  className="text-lg text-slate-600 mb-6 leading-relaxed" 
                  style={{ fontFamily: 'Satoshi-Regular' }}
                >
                  Vi tror på at deling skal være enkelt og tilgjengelig for alle. QRLab ble grunnlagt med visjonen om å eliminere friksjon mellom den fysiske og digitale verden.
                </p>
                <p 
                  className="text-lg text-slate-600 leading-relaxed" 
                  style={{ fontFamily: 'Satoshi-Regular' }}
                >
                  Enten du er en bedrift som ønsker å koble kunder til digitale opplevelser, eller en privatperson som vil dele innhold raskt, gir vi deg verktøyene du trenger.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Satoshi-Bold' }}>
                      50k+
                    </div>
                    <div className="text-slate-600" style={{ fontFamily: 'Satoshi-Regular' }}>
                      QR-koder laget
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Satoshi-Bold' }}>
                      2k+
                    </div>
                    <div className="text-slate-600" style={{ fontFamily: 'Satoshi-Regular' }}>
                      Aktive brukere
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Satoshi-Bold' }}>
                      99.9%
                    </div>
                    <div className="text-slate-600" style={{ fontFamily: 'Satoshi-Regular' }}>
                      Oppetid
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Satoshi-Bold' }}>
                      24/7
                    </div>
                    <div className="text-slate-600" style={{ fontFamily: 'Satoshi-Regular' }}>
                      Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="relative z-10 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-slate-900" 
                style={{ fontFamily: 'Satoshi-Bold' }}
              >
                Våre verdier
              </h2>
              <p 
                className="text-lg text-slate-600 max-w-3xl mx-auto" 
                style={{ fontFamily: 'Satoshi-Regular' }}
              >
                Dette er prinsippene som styrer alt vi gjør hos QRLab
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900" style={{ fontFamily: 'Satoshi-Bold' }}>
                  Enkelhet
                </h3>
                <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Satoshi-Regular' }}>
                  Vi tror på at teknologi skal være intuitivt og tilgjengelig for alle, uansett teknisk bakgrunn.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900" style={{ fontFamily: 'Satoshi-Bold' }}>
                  Sikkerhet
                </h3>
                <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Satoshi-Regular' }}>
                  Dine data og personvern er vår høyeste prioritet. Vi bruker bransjens beste sikkerhetsløsninger.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900" style={{ fontFamily: 'Satoshi-Bold' }}>
                  Innovasjon
                </h3>
                <p className="text-slate-600 leading-relaxed" style={{ fontFamily: 'Satoshi-Regular' }}>
                  Vi jobber kontinuerlig med å forbedre plattformen og legge til nye funksjoner basert på tilbakemeldinger.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="relative z-10 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6 text-slate-900" 
                style={{ fontFamily: 'Satoshi-Bold' }}
              >
                Teamet bak QRLab
              </h2>
              <p 
                className="text-lg text-slate-600 max-w-3xl mx-auto" 
                style={{ fontFamily: 'Satoshi-Regular' }}
              >
                Vi er et dedikert team av utviklere, designere og produktspesialister
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900" style={{ fontFamily: 'Satoshi-Bold' }}>
                  Erik Hansen
                </h3>
                <p className="text-slate-600 mb-3" style={{ fontFamily: 'Satoshi-Medium' }}>
                  Grunnlegger & CEO
                </p>
                <p className="text-sm text-slate-500" style={{ fontFamily: 'Satoshi-Regular' }}>
                  10+ års erfaring innen produktutvikling og teknologi
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900" style={{ fontFamily: 'Satoshi-Bold' }}>
                  Maja Olsen
                </h3>
                <p className="text-slate-600 mb-3" style={{ fontFamily: 'Satoshi-Medium' }}>
                  Lead Designer
                </p>
                <p className="text-sm text-slate-500" style={{ fontFamily: 'Satoshi-Regular' }}>
                  Ekspert på brukeropplevelse og visuell design
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900" style={{ fontFamily: 'Satoshi-Bold' }}>
                  Thomas Berg
                </h3>
                <p className="text-slate-600 mb-3" style={{ fontFamily: 'Satoshi-Medium' }}>
                  Senior Utvikler
                </p>
                <p className="text-sm text-slate-500" style={{ fontFamily: 'Satoshi-Regular' }}>
                  Fullstack utvikler med fokus på skalerbare løsninger
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="relative z-10 px-6 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white border border-slate-200 rounded-3xl p-12">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-slate-900" 
                style={{ fontFamily: 'Satoshi-Bold' }}
              >
                Har du spørsmål?
              </h2>
              <p 
                className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto" 
                style={{ fontFamily: 'Satoshi-Regular' }}
              >
                Vi er her for å hjelpe. Ta kontakt med oss hvis du har spørsmål eller tilbakemeldinger.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="px-8 py-4 bg-slate-900 text-white text-lg rounded-xl hover:bg-slate-800 transition-colors" 
                  style={{ fontFamily: 'Satoshi-Bold' }}
                >
                  Kontakt oss
                </button>
                <button 
                  className="px-8 py-4 border-2 border-slate-200 text-slate-700 text-lg rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors" 
                  style={{ fontFamily: 'Satoshi-Medium' }}
                >
                  Se kundeservice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 