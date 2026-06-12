import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// Organized images with better quality sources
const GALLERY_DATA = [
  {
    category: "Suites & Chambres",
    images: [
      { src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1200", alt: "Suite avec Tête de Lit Premium" },
      { src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1200", alt: "Salle de Bain de Luxe" },
      { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200", alt: "Balcon Chambre Deluxe" },
      { src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200", alt: "Twin Économique" },
      { src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200", alt: "Salon de Suite Principale" },
    ]
  },
  {
    category: "Restauration & Bar",
    images: [
      { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200", alt: "Restaurant Principal" },
      { src: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1200", alt: "Bar à Cocktails" },
      { src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200", alt: "Installation Gastronomique" },
      { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200", alt: "Spécialité du Chef" },
    ]
  },
  {
    category: "Bien-être & Spa",
    images: [
      { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200", alt: "Salle de Massage" },
      { src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200", alt: "Sauna & Hammam" },
      { src: "https://images.unsplash.com/photo-1571501443899-eaab326c5f59?auto=format&fit=crop&q=80&w=1200", alt: "Studio de Yoga" },
    ]
  },
  {
    category: "Extérieurs & Piscines",
    images: [
      { src: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de8f5?auto=format&fit=crop&q=80&w=1200", alt: "Piscine à Débordement" },
      { src: "https://images.unsplash.com/photo-1542314831-c6a4d14faaf2?auto=format&fit=crop&q=80&w=1200", alt: "Façade de l'Hôtel" },
      { src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200", alt: "Jardins Tropicaux" },
    ]
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState(GALLERY_DATA[0].category);
  const [selectedImageIdx, setSelectedImageIdx] = useState<number | null>(null);

  const activeImages = GALLERY_DATA.find(c => c.category === activeCategory)?.images || [];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) {
      setSelectedImageIdx((selectedImageIdx + 1) % activeImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIdx !== null) {
      setSelectedImageIdx((selectedImageIdx - 1 + activeImages.length) % activeImages.length);
    }
  };

  return (
    <div className="w-full bg-brand-cream/30 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-brand-dark tracking-tight mb-6">Galerie</h1>
          <p className="text-brand-muted max-w-xl leading-relaxed mb-10">
            Faites un voyage visuel à travers notre magnifique domaine, capturant l'essence du luxe et de la pure tranquillité.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-10">
            {GALLERY_DATA.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat.category 
                    ? 'bg-brand-dark text-white border-brand-dark' 
                    : 'border-brand-dark/20 text-brand-dark hover:bg-brand-dark/5'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {activeImages.map((img, idx) => (
              <motion.div
                layout
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid relative group rounded-[1.5rem] md:rounded-[2rem] overflow-hidden cursor-pointer"
                onClick={() => setSelectedImageIdx(idx)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  loading="lazy"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700 bg-brand-dark/5" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Maximize2 className="text-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIdx !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={() => setSelectedImageIdx(null)}>
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={(e) => { e.stopPropagation(); setSelectedImageIdx(null); }}
            >
              <X className="w-8 h-8" />
            </motion.button>
            
            <div className="absolute top-6 left-6 text-white/50 font-serif tracking-widest text-sm p-2">
              {activeImages[selectedImageIdx].alt}
            </div>

            <button 
              className="absolute left-4 md:left-12 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all"
              onClick={handlePrev}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <motion.img
              key={activeImages[selectedImageIdx].src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={activeImages[selectedImageIdx].src}
              alt={activeImages[selectedImageIdx].alt}
              className="max-h-[85vh] max-w-[85vw] object-contain select-none"
              onClick={(e) => e.stopPropagation()}
            />

            <button 
              className="absolute right-4 md:right-12 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm transition-all"
              onClick={handleNext}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full text-white/70 text-sm">
              {selectedImageIdx + 1} / {activeImages.length}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
