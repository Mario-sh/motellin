import React from 'react';
import { BedDouble, Maximize, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useBooking } from '../context/BookingContext';

const ROOMS = [
  { 
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800', 
    beds: '2 Double(s)', size: '120m2', guests: '3 Invités', 
    title: 'Suite Premium', price: '$400.00',
    description: 'Notre offre la plus luxueuse, avec vue panoramique et services exclusifs.'
  },
  { 
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800', 
    beds: '1 Double(s)', size: '120m2', guests: '2 Invités', 
    title: 'Chambre Classique', price: '$450.00',
    description: 'Idéale pour les couples en quête d\'une escapade tranquille et intime.'
  },
  { 
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800', 
    beds: '3 Double(s)', size: '200m2', guests: '4 Invités', 
    title: 'Chambre Économique', price: '$300.00',
    description: 'Une option confortable et spacieuse pour les familles ou les groupes.'
  },
  { 
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800', 
    beds: '2 Double(s)', size: '150m2', guests: '3 Invités', 
    title: 'Standard Deluxe', price: '$400.00',
    description: 'Un mélange d\'élégance classique et de confort moderne avec balcon privé.'
  },
];

export default function Rooms() {
  const { openBooking } = useBooking();

  return (
    <div className="w-full bg-brand-light min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-brand-dark tracking-tight mb-6">Nos Chambres</h1>
          <p className="text-brand-muted max-w-2xl mx-auto leading-relaxed">
            Vivez un confort inégalé dans nos chambres et suites méticuleusement conçues. 
            Chaque espace est un havre de détente, mêlant services modernes et charme intemporel.
          </p>
        </motion.div>

        <div className="flex flex-col gap-20">
          {ROOMS.map((room, idx) => (
            <motion.div 
              key={room.title}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-center group`}
            >
              <div className="w-full lg:w-3/5">
                <div className="relative rounded-[2rem] overflow-hidden aspect-[16/10] shadow-2xl">
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              
              <div className="w-full lg:w-2/5 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-brand-muted mb-6 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" />{room.beds}</span>
                  <span className="flex items-center gap-1.5"><Maximize className="w-4 h-4" />{room.size}</span>
                  <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{room.guests}</span>
                </div>
                
                <h3 className="text-4xl md:text-5xl font-serif text-brand-dark mb-6">{room.title}</h3>
                <p className="text-brand-muted leading-relaxed mb-8">{room.description}</p>
                
                <div className="flex items-center justify-between mt-auto border-t border-brand-dark/10 pt-8">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-brand-muted block mb-1">À partir de</span>
                    <span className="text-3xl font-bold font-serif text-brand-dark">{room.price}</span>
                    <span className="text-brand-muted text-sm border-0 ml-1">/ nuit</span>
                  </div>
                  <button 
                    onClick={() => openBooking(room.title)}
                    className="px-8 py-3 rounded-full bg-brand-dark text-white font-medium hover:bg-brand-muted transition-colors cursor-pointer"
                  >
                    Réserver
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
