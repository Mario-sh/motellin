import React from 'react';
import { motion } from 'motion/react';
import { useBooking } from '../context/BookingContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Star, Wifi, Coffee, Waves } from 'lucide-react';

export default function Home() {
  const { openBooking } = useBooking();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-brand-light min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-c6a4d14faaf2?auto=format&fit=crop&q=80&w=2000" 
            alt="Hotel Exterior" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-brand-dark/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mt-20">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-white/90 uppercase tracking-widest text-sm font-semibold mb-6"
          >
            Bienvenue à Motelin
          </motion.p>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight mb-8"
          >
            Le luxe absolu<br />à votre portée
          </motion.h1>
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button 
              onClick={() => openBooking()}
              className="bg-white text-brand-dark px-10 py-4 rounded-full font-medium hover:bg-brand-cream transition-colors cursor-pointer w-full sm:w-auto"
            >
              Réserver votre séjour
            </button>
            <button 
              onClick={() => navigate('/amenities')}
              className="border border-white/30 bg-black/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-colors cursor-pointer w-full sm:w-auto"
            >
              Découvrir nos services
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
        >
          <span className="text-xs uppercase tracking-widest mb-2 font-medium">Défiler pour explorer</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="py-24 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <p className="text-brand-muted uppercase tracking-widest text-sm font-semibold mb-6">Notre Histoire</p>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark tracking-tight mb-6 leading-tight">
              Un sanctuaire de paix au cœur de la ville
            </h2>
            <p className="text-brand-muted leading-relaxed mb-8">
              Conçu pour redéfinir l'expérience hôtelière de luxe, Motelin est né de la passion pour le service exceptionnel et le design élégant. Chaque élément, du hall spectaculaire aux chambres somptueuses, a été pensé pour vous offrir un séjour inoubliable, où confort et esthétisme se rencontrent.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h4 className="text-4xl font-serif text-brand-dark mb-2">15+</h4>
                <p className="text-brand-muted text-sm uppercase tracking-wider font-medium">Années d'excellence</p>
              </div>
              <div>
                <h4 className="text-4xl font-serif text-brand-dark mb-2">5<Star className="inline w-6 h-6 ml-1 text-brand-dark fill-brand-dark mb-1" /></h4>
                <p className="text-brand-muted text-sm uppercase tracking-wider font-medium">Étoiles reconnues</p>
              </div>
            </div>
            <Link to="/gallery" className="inline-flex items-center gap-2 text-brand-dark font-medium border-b border-brand-dark pb-1 hover:text-brand-muted hover:border-brand-muted transition-colors">
              Voir notre galerie <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative"
          >
            <div className="rounded-[2rem] overflow-hidden aspect-[4/5] w-full shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000" 
                alt="Hotel Interior" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <p className="text-brand-muted uppercase tracking-widest text-sm font-semibold mb-4">Hébergement</p>
              <h2 className="text-4xl md:text-5xl font-serif text-brand-dark tracking-tight">Chambres et Suites</h2>
            </div>
            <button 
              onClick={() => navigate('/rooms')}
              className="text-brand-dark font-medium border-b border-brand-dark pb-0.5 hover:text-brand-muted hover:border-brand-muted transition-colors"
            >
              Découvrir toutes les chambres
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: "Suite Premium",
                desc: "Notre offre la plus luxueuse, avec vue panoramique et services exclusifs.",
                price: "$400.00",
                img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800"
              },
              {
                title: "Chambre Classique",
                desc: "Idéale pour les couples en quête d'une escapade tranquille et intime.",
                price: "$450.00",
                img: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800"
              }
            ].map((room, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group cursor-pointer"
                onClick={() => openBooking(room.title)}
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative">
                  <img src={room.img} alt={room.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-serif text-brand-dark mb-2">{room.title}</h3>
                    <p className="text-brand-muted text-sm max-w-sm leading-relaxed">{room.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-brand-muted text-xs uppercase tracking-widest mb-1">À partir de</span>
                    <span className="text-xl font-bold font-serif text-brand-dark">{room.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Basic Amenities */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-muted uppercase tracking-widest text-sm font-semibold mb-4">Installations</p>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark tracking-tight">Pour votre confort</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Wifi, title: "Wi-Fi Haut Débit", desc: "Connexion gratuite dans tout l'hôtel" },
            { icon: Coffee, title: "Petit-Déjeuner", desc: "Buffet gastronomique inclus tous les matins" },
            { icon: Waves, title: "Piscine & Spa", desc: "Accès illimité à nos espaces détente" },
            { icon: Star, title: "Service en Chambre", desc: "Disponible 24h/24 pour toutes vos envies" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center mb-6">
                <item.icon className="w-6 h-6 text-brand-dark" />
              </div>
              <h4 className="text-lg font-serif text-brand-dark mb-2">{item.title}</h4>
              <p className="text-sm text-brand-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 bg-brand-dark text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-brand-cream tracking-tight mb-8">Un séjour d'exception vous attend</h2>
          <button 
            onClick={() => openBooking()}
            className="bg-brand-cream text-brand-dark px-10 py-5 rounded-full font-medium hover:bg-white transition-colors cursor-pointer text-lg"
          >
            Réservez dès maintenant
          </button>
        </motion.div>
      </section>

    </div>
  );
}
