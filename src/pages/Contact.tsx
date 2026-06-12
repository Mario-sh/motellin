import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="w-full bg-brand-light min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h1 className="text-5xl md:text-7xl font-serif text-brand-dark tracking-tight mb-8">Contactez-nous</h1>
            <p className="text-brand-muted leading-relaxed mb-12 max-w-lg">
              Nous avons hâte de vous accueillir au Motelin. Si vous avez une question sur nos réservations, nos services ou nos demandes spéciales, notre équipe est là pour vous assister.
            </p>
            
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center shrink-0 text-brand-dark">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1 text-brand-dark">Localisation</h4>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    Unit 7 / 61-63 Macleay St<br />
                    Potts Point New South Wales<br />
                    Australia 2011
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center shrink-0 text-brand-dark">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1 text-brand-dark">Téléphone</h4>
                  <p className="text-brand-muted text-sm">+61 2 9358 1234</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border border-brand-dark/20 flex items-center justify-center shrink-0 text-brand-dark">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-1 text-brand-dark">Email</h4>
                  <p className="text-brand-muted text-sm">reservations@motelin.com</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl">
              <h3 className="text-3xl font-serif text-brand-dark mb-8">Envoyez-nous un message</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">Prénom</label>
                    <input type="text" className="w-full border-b border-brand-dark/20 py-2 outline-none focus:border-brand-dark transition-colors bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">Nom de famille</label>
                    <input type="text" className="w-full border-b border-brand-dark/20 py-2 outline-none focus:border-brand-dark transition-colors bg-transparent" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">Adresse Email</label>
                  <input type="email" className="w-full border-b border-brand-dark/20 py-2 outline-none focus:border-brand-dark transition-colors bg-transparent" />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">Message</label>
                  <textarea rows={4} className="w-full border-b border-brand-dark/20 py-2 outline-none focus:border-brand-dark transition-colors bg-transparent resize-none"></textarea>
                </div>
                
                <button type="submit" className="w-full py-4 bg-brand-dark text-white rounded-full font-medium hover:bg-brand-muted transition-colors mt-4">
                  Envoyer le message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
