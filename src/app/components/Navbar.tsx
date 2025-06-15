import { Button } from './ui/button';

export default function Navbar() {
    return (
        <nav className="relative z-10 flex justify-center py-6 px-6">
          <div className="flex items-center justify-between w-full max-w-6xl">
            <div className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Satoshi-Black' }}>
              <a href="/">QRLab</a>
            </div>
            <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
              <a 
                href="#" 
                className="text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-md hover:bg-slate-50" 
                style={{ fontFamily: 'Satoshi-Medium' }}
              >
                Hva er dette
              </a>
              <a 
                href="#" 
                className="text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-md hover:bg-slate-50" 
                style={{ fontFamily: 'Satoshi-Medium' }}
              >
                Kundeservice
              </a>
              <a 
                href="about" 
                className="text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-md hover:bg-slate-50" 
                style={{ fontFamily: 'Satoshi-Medium' }}
              >
                Om Oss
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                className="text-slate-600 hover:text-slate-900 hover:cursor-pointer"
                style={{ fontFamily: 'Satoshi-Medium' }}
              >
                Logg inn
              </Button>
              <Button 
                variant="default"
                style={{ fontFamily: 'Satoshi-Medium'}}
                className="hover:cursor-pointer"
              >
                Bruker
              </Button>
            </div>
          </div>
        </nav>
    )
}