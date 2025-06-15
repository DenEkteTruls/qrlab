


export default function Footer() {
    return (
        <footer className="relative z-10 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Brand Column */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-slate-500 rounded-lg flex items-center justify-center">
                    <svg 
                      viewBox="0 0 24 24" 
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                    >
                      <path d="M3 11V3H11V11H3ZM5 9H9V5H5V9ZM3 21V13H11V21H3ZM5 19H9V15H5V19ZM13 3V11H21V3H13ZM19 9H15V5H19V9ZM19 13H21V15H19V13ZM13 13H15V15H13V13ZM15 15H17V17H15V15ZM17 17H19V19H17V17ZM19 19H21V21H19V19ZM17 19H19V21H17V19ZM13 17H15V19H13V17ZM13 19H15V21H13V19Z"/>
                    </svg>
                  </div>
                  <span className="text-2xl font-bold" style={{ fontFamily: 'Satoshi-Bold' }}>
                    QRLab
                  </span>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed" style={{ fontFamily: 'Satoshi-Regular' }}>
                  Den enkleste måten å lage og dele QR-koder på. Perfekt for bedrifter, events og personlig bruk.
                </p>
                {/* Social Links */}
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product Column */}
              <div>
                <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'Satoshi-Bold' }}>
                  Produkt
                </h3>
                <ul className="space-y-4 text-slate-300" style={{ fontFamily: 'Satoshi-Regular' }}>
                  <li><a href="#" className="hover:text-white transition-colors">QR Generator</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Bulk Generator</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API Tilgang</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tilpassede Design</a></li>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'Satoshi-Bold' }}>
                  Selskap
                </h3>
                <ul className="space-y-4 text-slate-300" style={{ fontFamily: 'Satoshi-Regular' }}>
                  <li><a href="#" className="hover:text-white transition-colors">Om oss</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Karriere</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blogg</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Partnere</a></li>
                </ul>
              </div>

              {/* Support Column */}
              <div>
                <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'Satoshi-Bold' }}>
                  Support
                </h3>
                <ul className="space-y-4 text-slate-300" style={{ fontFamily: 'Satoshi-Regular' }}>
                  <li><a href="#" className="hover:text-white transition-colors">Hjelp & FAQ</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Kontakt oss</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Dokumentasjon</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Status Side</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Rapporter Bug</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-slate-700 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-slate-400 text-sm" style={{ fontFamily: 'Satoshi-Regular' }}>
                  © 2024 QRLab. Alle rettigheter reservert.
                </div>
                <div className="flex space-x-6 text-sm text-slate-400">
                  <a href="#" className="hover:text-white transition-colors" style={{ fontFamily: 'Satoshi-Regular' }}>
                    Personvern
                  </a>
                  <a href="#" className="hover:text-white transition-colors" style={{ fontFamily: 'Satoshi-Regular' }}>
                    Vilkår
                  </a>
                  <a href="#" className="hover:text-white transition-colors" style={{ fontFamily: 'Satoshi-Regular' }}>
                    Cookies
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
    )
}