import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ReactLenis } from 'lenis/react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

import { useBooking } from '../context/BookingContext';

const NAV_LINKS = [
  { label: 'Accueil', path: '/', activeKeys: ['/', '/home'] },
  { label: 'Galerie', path: '/gallery', activeKeys: ['/gallery'] },
  { label: 'Chambres', path: '/rooms', activeKeys: ['/rooms'] },
  { label: 'Contact', path: '/contact', activeKeys: ['/contact'] },
];

export const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[60] py-4 px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'bg-transparent py-4' 
            : scrolled 
              ? 'bg-brand-dark/90 backdrop-blur-md py-3 shadow-lg' 
              : 'bg-gradient-to-b from-black/50 to-transparent py-6'
        }`}
      >
        <Link to="/" className={`font-serif font-bold text-2xl md:text-3xl tracking-widest relative transition-colors duration-300 ${isMobileMenuOpen ? 'text-white' : 'text-white'}`}>
          Motelin
        </Link>
        
        {/* Desktop Menu */}
        <div className={`hidden lg:flex items-center gap-1 border border-white/20 rounded-full p-1 bg-black/20 backdrop-blur-md transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {NAV_LINKS.map((link) => {
            const isActive = link.activeKeys.includes(location.pathname) || (link.label === 'Services' && location.pathname === '/');
            
            return (
              <Link 
                key={link.label}
                to={link.path}
                className={`flex items-center gap-1 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-white text-brand-dark shadow-sm' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        
        {/* Right CTA Desktop */}
        <div className={`hidden lg:flex items-center justify-end w-[120px] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button onClick={() => openBooking()} className="text-white text-sm font-medium border-b border-white hover:text-brand-cream hover:border-brand-cream transition-colors pb-0.5 cursor-pointer">
            Réserver
          </button>
        </div>

        {/* Mobile Filter / Toggle */}
        <button 
          className={`lg:hidden relative p-2.5 cursor-pointer z-[70] rounded-full backdrop-blur-sm border transition-colors duration-300 ${
            isMobileMenuOpen 
              ? 'bg-white/10 border-white/20 text-white' 
              : 'bg-black/20 border-white/10 text-white hover:bg-black/30'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-brand-dark/95 backdrop-blur-3xl flex flex-col pt-32 pb-12 px-8"
          >
            <div className="flex flex-col gap-4 sm:gap-6 items-center flex-1 justify-center relative z-10 w-full max-w-sm mx-auto">
              {NAV_LINKS.map((link, idx) => {
                const isActive = link.activeKeys.includes(location.pathname) || (link.label === 'Services' && location.pathname === '/');
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.4, ease: "easeOut" }}
                    className="w-full text-center"
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block w-full text-4xl sm:text-5xl font-serif tracking-tight border-b border-white/5 pb-4 ${
                        isActive ? 'text-white' : 'text-brand-muted hover:text-white transition-colors'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.08, duration: 0.4 }}
                className="mt-6 w-full"
              >
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); openBooking(); }} 
                  className="w-full py-4 sm:py-5 bg-white text-brand-dark rounded-full font-medium text-lg shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  Réservez votre séjour
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-10 pt-6 border-t border-white/10 w-full text-center text-brand-muted/50 text-xs tracking-widest uppercase font-semibold"
              >
                <p className="mb-2">Motelin Complexe de Luxe</p>
                <p>+61 2 9358 1234</p>
              </motion.div>
            </div>
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-brand-light pt-24 pb-8 px-6 text-brand-dark border-t border-brand-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-20 font-sans text-sm">
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-base mb-2 font-serif tracking-wide">À propos</h4>
            <Link to="#" className="text-brand-muted hover:text-brand-dark transition-colors">Notre histoire</Link>
            <Link to="/rooms" className="text-brand-muted hover:text-brand-dark transition-colors">Nos chambres</Link>
            <Link to="/contact" className="text-brand-muted hover:text-brand-dark transition-colors">Nous contacter</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-base mb-2 font-serif tracking-wide">Réservation</h4>
            <Link to="#" className="text-brand-muted hover:text-brand-dark transition-colors">Demander une facture</Link>
            <Link to="#" className="text-brand-muted hover:text-brand-dark transition-colors">Gérer ma réservation</Link>
            <Link to="/rooms" className="text-brand-muted hover:text-brand-dark transition-colors">Hébergement</Link>
            <Link to="#" className="text-brand-muted hover:text-brand-dark transition-colors">Conseils de destination</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-base mb-2 font-serif tracking-wide">Heures d'ouverture</h4>
            <p className="text-brand-muted">Lun - Ven : 10h - 22h</p>
            <p className="text-brand-muted">Samedi : 9h - 17h</p>
            <p className="text-brand-muted">Dimanche : 11h - 15h</p>
          </div>
          <div className="flex flex-col gap-4 lg:col-span-2 lg:items-end lg:text-right">
            <h4 className="font-semibold text-base mb-2 font-serif tracking-wide">Adresse</h4>
            <p className="text-brand-muted max-w-[200px] lg:mx-0 mx-auto">
              Unité 7 / 61-63 rue Macleay, Potts Point, NSW. Australie 2011
            </p>
            <Link to="#" className="text-brand-dark font-medium hover:text-brand-muted transition-colors mt-2 text-base">
              www.MotelinThemes.span
            </Link>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-muted/20 text-center flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <p>Copyright © 2024 Motelin. Tous droits réservés.</p>
          <p>Propulsé par ThemeAgency Pvt. Ltd.</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis root>
      <div className="font-sans antialiased selection:bg-brand-dark selection:text-white overflow-x-hidden relative">
        <div className="absolute inset-0 bg-brand-light -z-10" />
        <Navbar />
        {children}
        <Footer />
      </div>
    </ReactLenis>
  );
};
