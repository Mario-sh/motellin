import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Calendar, Users } from 'lucide-react';

interface BookingContextType {
  openBooking: (roomTitle?: string) => void;
  closeBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Form, 2: Loading, 3: Success

  const openBooking = (roomTitle: string = 'Sélectionnez une chambre') => {
    setSelectedRoom(roomTitle);
    setStep(1);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeBooking = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => {
      setStep(1);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  return (
    <BookingContext.Provider value={{ openBooking, closeBooking }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBooking}
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-brand-light rounded-[2rem] shadow-2xl overflow-hidden z-10"
            >
              <button 
                onClick={closeBooking}
                className="absolute top-6 right-6 text-brand-muted hover:text-brand-dark transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-8 md:p-10">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-3xl font-serif text-brand-dark mb-2">Réservez votre séjour</h2>
                    <p className="text-brand-muted text-sm mb-8">Découvrez le luxe et l'élégance à Motelin.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">Type de chambre</label>
                        <select 
                          className="w-full bg-white border border-brand-dark/10 px-4 py-3 rounded-xl outline-none focus:border-brand-dark transition-colors text-brand-dark"
                          value={selectedRoom}
                          onChange={(e) => setSelectedRoom(e.target.value)}
                        >
                          <option value="Sélectionnez une chambre" disabled>Sélectionnez une chambre</option>
                          <option value="Suite Premium">Suite Premium</option>
                          <option value="Chambre Classique">Chambre Classique</option>
                          <option value="Chambre Économique">Chambre Économique</option>
                          <option value="Standard Deluxe">Standard Deluxe</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">Arrivée</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
                            <input type="date" required className="w-full bg-white border border-brand-dark/10 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-brand-dark transition-colors text-brand-dark text-sm" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">Départ</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
                            <input type="date" required className="w-full bg-white border border-brand-dark/10 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-brand-dark transition-colors text-brand-dark text-sm" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">Invités</label>
                        <div className="relative">
                           <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
                           <select className="w-full bg-white border border-brand-dark/10 pl-10 pr-4 py-3 rounded-xl outline-none focus:border-brand-dark transition-colors text-brand-dark">
                            <option>1 Invité</option>
                            <option>2 Invités</option>
                            <option>3 Invités</option>
                            <option>4+ Invités</option>
                          </select>
                        </div>
                      </div>

                      <button type="submit" className="w-full py-4 bg-brand-dark text-white rounded-xl font-medium hover:bg-black transition-colors mt-4">
                        Confirmer la réservation
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-brand-dark/20 border-t-brand-dark rounded-full animate-spin mb-6"></div>
                    <h3 className="text-xl font-serif text-brand-dark">Traitement de votre réservation...</h3>
                    <p className="text-brand-muted text-sm mt-2">Veuillez patienter un instant</p>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center justify-center text-center">
                    <CheckCircle2 className="w-20 h-20 text-green-600 mb-6" />
                    <h3 className="text-3xl font-serif text-brand-dark mb-4">Réservation Confirmée !</h3>
                    <p className="text-brand-muted leading-relaxed mb-8 max-w-sm mx-auto">
                      Merci d'avoir choisi Motelin. Nous vous avons envoyé les détails par courriel. Nous avons hâte de vous recevoir !
                    </p>
                    <button onClick={closeBooking} className="px-8 py-3 bg-brand-dark text-white rounded-full font-medium hover:bg-black transition-colors">
                      Terminé
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}
