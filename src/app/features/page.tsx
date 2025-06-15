"use client";

import '../../../public/Fonts/WEB/css/satoshi.css';
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Features() {
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
        <div className="relative z-10 text-center px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-slate-900 leading-tight" 
              style={{ fontFamily: 'Satoshi-Black' }}
            >
              Alt du trenger for
              <span className="text-blue-600"> smarte QR-koder</span>
            </h1>
            <p 
              className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed" 
              style={{ fontFamily: 'Satoshi-Regular' }}
            >
              En komplett platform for å lage, administrere og spore QR-koder. Simpelt nok for alle, kraftfullt nok for bedrifter.
            </p>
          </div>
        </div>

        {/* Core Features Grid */}
        <div className="relative z-10 px-6 pb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Dynamic QR Codes */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Satoshi-Bold' }}>
                Dynamiske QR-koder
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: 'Satoshi-Regular' }}>
                Endre destinasjonen til QR-koden din når som helst uten å trykke ny kode. Perfekt for kampanjer og events.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="text-sm text-slate-500 mb-2">Eksempel:</div>
                <div className="text-sm text-slate-700">qrlab.no/abc123 → kan peke til hvilken URL som helst</div>
              </div>
            </div>

            {/* Bulk Generation */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Satoshi-Bold' }}>
                Bulk-generering
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: 'Satoshi-Regular' }}>
                Last opp en CSV-fil og generer hundrevis av QR-koder på sekunder. Perfekt for events, produkter eller team.
              </p>
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-slate-700">Opptil 1000 QR-koder per batch</span>
                </div>
              </div>
            </div>

            {/* Custom Design */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a4 4 0 004 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Satoshi-Bold' }}>
                Tilpasset design
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: 'Satoshi-Regular' }}>
                Legg til din logo, velg farger og former som passer ditt brand. Gjør QR-kodene dine unike og gjenkjennelige.
              </p>
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-blue-500 rounded border-2 border-white shadow-sm"></div>
                <div className="w-6 h-6 bg-green-500 rounded border-2 border-white shadow-sm"></div>
                <div className="w-6 h-6 bg-purple-500 rounded border-2 border-white shadow-sm"></div>
                <div className="w-6 h-6 bg-slate-300 rounded border-2 border-white shadow-sm flex items-center justify-center">
                  <span className="text-xs text-slate-600">+</span>
                </div>
              </div>
            </div>

            {/* Analytics Dashboard */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Satoshi-Bold' }}>
                Detaljert analyse
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: 'Satoshi-Regular' }}>
                Se hvor, når og hvor mange som scanner QR-kodene dine. Få innsikt i hvilke kampanjer som fungerer best.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Scans i dag</span>
                  <span className="font-medium text-slate-900">+24</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Topp land</span>
                  <span className="font-medium text-slate-900">🇳🇴 Norge</span>
                </div>
              </div>
            </div>

            {/* Team Collaboration */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Satoshi-Bold' }}>
                Team samarbeid
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: 'Satoshi-Regular' }}>
                Inviter teammedlemmer, del QR-koder og administrer tilganger. Perfekt for markedsføringsteam og byråer.
              </p>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-medium">A</div>
                <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-medium">B</div>
                <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-medium">C</div>
                <div className="w-8 h-8 bg-slate-300 rounded-full border-2 border-white flex items-center justify-center text-slate-600 text-sm">+2</div>
              </div>
            </div>

            {/* API Access */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Satoshi-Bold' }}>
                API tilgang
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed" style={{ fontFamily: 'Satoshi-Regular' }}>
                Integrer QR-kodegenerering direkte i dine egne applikasjoner og workflows med vårt REST API.
              </p>
              <div className="bg-slate-900 rounded-lg p-3 text-sm text-green-400 font-mono">
                POST /api/qr/generate
              </div>
            </div>
          </div>
        </div>

        {/* QR Types Section */}
        <div className="relative z-10 px-6 pb-16">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl font-bold mb-4 text-slate-900" 
              style={{ fontFamily: 'Satoshi-Bold' }}
            >
              Støtter alle typer QR-koder
            </h2>
            <p 
              className="text-xl text-slate-600 max-w-2xl mx-auto" 
              style={{ fontFamily: 'Satoshi-Regular' }}
            >
              Fra enkle URL-er til komplekse vCard-kontakter
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Satoshi-Medium' }}>URL</h4>
              <p className="text-sm text-slate-600">Nettadresser og lenker</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Satoshi-Medium' }}>vCard</h4>
              <p className="text-sm text-slate-600">Kontaktinformasjon</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Satoshi-Medium' }}>WiFi</h4>
              <p className="text-sm text-slate-600">Trådløse nettverk</p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2" style={{ fontFamily: 'Satoshi-Medium' }}>Tekst</h4>
              <p className="text-sm text-slate-600">Fri tekst og meldinger</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 px-6 pb-20">
          <div className="bg-slate-900 rounded-3xl p-12 text-center text-white">
            <h2 
              className="text-4xl font-bold mb-6" 
              style={{ fontFamily: 'Satoshi-Bold' }}
            >
              Klar til å komme i gang?
            </h2>
            <p 
              className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto" 
              style={{ fontFamily: 'Satoshi-Regular' }}
            >
              Opprett din første QR-kode i dag og opplev forskjellen
            </p>
            <Link href="/">
              <button 
                className="px-8 py-4 bg-white text-slate-900 text-lg rounded-xl hover:bg-slate-100 transform hover:scale-105 transition-all duration-200 shadow-lg font-semibold" 
                style={{ fontFamily: 'Satoshi-Bold' }}
              >
                Start gratis i dag
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 