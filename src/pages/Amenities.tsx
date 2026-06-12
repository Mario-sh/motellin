import React, { useState } from 'react';
import { Play, BedDouble, Maximize, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useBooking } from '../context/BookingContext';
import { Link } from 'react-router-dom';

const AMENITIES_DATA = [
  {
    id: "Restaurant & Bar",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000",
    features: [
      {
        title: "Décor élégant et vaste choix de boissons",
        desc: "Plongez dans l'atmosphère sophistiquée de notre décor épuré, tout en savourant une sélection de boissons préparées avec soin. Ambiance relaxante et soins apaisants pour votre confort optimal."
      },
      {
        title: "Sièges en plein air et musique live",
        desc: "Profitez de la douceur de nos espaces extérieurs. Dînez sous les étoiles tout en écoutant des divertissements musicaux live en parfaite harmonie avec le lieu."
      }
    ]
  },
  {
    id: "Spa & Bien-être",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1000",
    features: [
      {
        title: "Soins relaxants et massages exclusifs",
        desc: "Laissez-vous tenter par nos massages thérapeutiques et soins du visage. Un vrai cocon pour éveiller vos sens et relaxer votre corps entier."
      },
      {
        title: "Sauna, Hammam & Aromathérapie",
        desc: "Purifiez votre peau et votre esprit grâce à nos installations thermales haut de gamme aux huiles essentielles sélectionnées."
      }
    ]
  },
  {
    id: "Yoga & Fitness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000",
    features: [
      {
        title: "Studio de Yoga panoramique",
        desc: "Pratiquez le yoga face à des baies vitrées offrant une vue imprenable sur la nature sous les conseils de nos instructeurs certifiés."
      },
      {
        title: "Salle de sport équipée dernier cri",
        desc: "Maintenez votre routine avec nos équipements de cardio et musculation modernes, ouverts 24h/24 pour votre flexibilité."
      }
    ]
  },
  {
    id: "Terrasse Estivale",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1000",
    features: [
      {
        title: "Lounge à ciel ouvert",
        desc: "Baignez de soleil avec nos chaises longues confortables et un service impeccable pour vous rafraîchir en permanence."
      },
      {
        title: "Dégustation de tapas & cocktails",
        desc: "L'endroit idéal pour apprécier nos spécialités légères et cocktails rafraîchissants lors des douces soirées d'été."
      }
    ]
  },
  {
    id: "Jeux Enfants",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1000",
    features: [
      {
        title: "Espace d'éveil sécurisé",
        desc: "Des zones de jeux colorées, pensées et sécurisées spécifiquement pour le divertissement et l'éveil de vos enfants."
      },
      {
        title: "Activités encadrées par des professionnels",
        desc: "Laissez vos enfants s'amuser grâce à nos animateurs qui proposent chaque jour de nouvelles activités ludiques et éducatives."
      }
    ]
  },
  {
    id: "Piscine",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1000",
    features: [
      {
        title: "Piscine chauffée intérieure et extérieure",
        desc: "Nagez toute l'année dans nos bassins à température idéale, conçus pour la détente ou les longueurs sportives."
      },
      {
        title: "Jacuzzi & jets massants",
        desc: "Détendez vos muscles dans notre grand bain à remous équipé de jets ciblés, parfait après une longue journée."
      }
    ]
  },
  {
    id: "Événements",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000",
    features: [
      {
        title: "Salles de conférence modulables",
        desc: "Des espaces équipés des dernières technologies audiovisuelles, pouvant accueillir vos réunions et grands événements."
      },
      {
        title: "Service traiteur sur mesure",
        desc: "Un accompagnement culinaire de prestige pour vos mariages, banquets et séminaires professionnels."
      }
    ]
  }
];

const ROOMS = [
  { 
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800', 
    beds: '2 Double', size: '120m2', guests: '3 Invités', 
    title: 'Suite Premium', price: '$400.00' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800', 
    beds: '1 Double', size: '120m2', guests: '2 Invités', 
    title: 'Chambre Classique', price: '$450.00' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800', 
    beds: '3 Double', size: '200m2', guests: '4 Invités', 
    title: 'Chambre Économique', price: '$300.00' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800', 
    beds: '2 Double', size: '150m2', guests: '3 Invités', 
    title: 'Standard Deluxe', price: '$400.00' 
  },
];

const Hero = () => {
  return (
    <div className="relative w-full h-[60vh] lg:h-[70vh] bg-neutral-900 overflow-hidden">
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=2000" 
        alt="Hotel Lounge" 
        className="absolute inset-0 w-full h-full object-cover opacity-60" 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-light/90" />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-serif text-white tracking-tight mt-12"
        >
          Services
        </motion.h1>
      </div>
    </div>
  );
};

const AmenitiesSection = () => {
  const [activeTab, setActiveTab] = useState(AMENITIES_DATA[0].id);
  const currentAmenity = AMENITIES_DATA.find(a => a.id === activeTab) || AMENITIES_DATA[0];

  return (
    <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto bg-brand-light overflow-hidden">
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16"
      >
        <h2 className="text-5xl md:text-7xl font-serif max-w-2xl leading-tight text-brand-dark tracking-tight">
          Nous offrons<br />le meilleur pour vous
        </h2>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-3 mb-16 justify-center"
      >
        {AMENITIES_DATA.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full text-sm md:text-base border transition-all ${
              activeTab === tab.id 
                ? 'bg-brand-dark text-white border-brand-dark' 
                : 'border-brand-muted/30 text-brand-dark hover:border-brand-dark'
            }`}
          >
            {tab.id}
          </button>
        ))}
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
        <div className="w-full lg:w-1/2 rounded-[2rem] overflow-hidden shadow-2xl bg-brand-dark/5 relative h-[400px] md:h-[500px]">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentAmenity.image}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={currentAmenity.image}
              alt={currentAmenity.id} 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAmenity.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-12 w-full"
            >
              {currentAmenity.features.map((feature, idx) => (
                <div key={idx}>
                  <h3 className="text-2xl md:text-3xl font-serif mb-4 text-brand-dark">{feature.title}</h3>
                  <p className="text-brand-muted leading-relaxed font-sans">
                    {feature.desc}
                  </p>
                  {idx === 0 && <div className="h-px bg-brand-muted/20 w-full mt-12" />}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const RoomsSection = () => {
  return (
    <section className="py-20 bg-brand-cream/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-serif text-brand-dark max-w-xl leading-tight tracking-tight">
            La chambre d'hôtel<br />de vos rêves
          </h2>
          <div className="max-w-sm flex flex-col items-start lg:items-end">
            <p className="text-brand-muted text-sm lg:text-right mb-4">Un mobilier somptueux, des vues imprenables, des équipements luxueux et des services ultra personnalisés vous attendent !</p>
            <Link to="/rooms" className="font-semibold text-brand-dark border-b-2 border-brand-dark pb-0.5 hover:text-brand-muted hover:border-brand-muted transition-colors">
              Voir toutes les chambres
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {ROOMS.map((room, idx) => {
            const { openBooking } = useBooking();
            return (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={room.title} 
              className="group cursor-pointer"
            >
              <div className="relative rounded-3xl overflow-hidden mb-6 aspect-[4/3] bg-brand-dark/5">
                 <img src={room.image} alt={room.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex items-center gap-3 md:gap-4 text-xs font-semibold text-brand-muted mb-3 uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5" />{room.beds}</span>
                <span className="flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5" />{room.size}</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{room.guests}</span>
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-4 group-hover:text-amber-800 transition-colors">{room.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold font-serif">{room.price}</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); openBooking(room.title); }}
                  className="px-5 py-2 rounded-full bg-brand-cream text-brand-dark font-medium text-sm hover:bg-brand-dark hover:text-white transition-colors cursor-pointer"
                >
                  Book now
                </button>
              </div>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
};

const GalleryAndStats = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top half is brand-light, bottom half is brand-dark to create the overlap effect */}
      <div className="absolute top-0 left-0 w-full h-[300px] md:h-[400px] bg-brand-light z-0" />
      <div className="absolute bottom-0 left-0 w-full h-[calc(100%-300px)] md:h-[calc(100%-400px)] bg-brand-dark z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 md:mb-32">
          {/* Img 1 */}
          <motion.div 
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-t-[500px] overflow-hidden translate-y-0 shadow-2xl bg-brand-dark/5"
          >
            <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600" loading="lazy" alt="Gallery View 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          {/* Img 2 - staggered down slightly */}
          <motion.div 
            initial={{ y: 120, opacity: 0 }}
            whileInView={{ y: 48, opacity: 1 }} // 48px is md:translate-y-12
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-t-[500px] overflow-hidden md:translate-y-12 shadow-2xl bg-brand-dark/5"
          >
            <img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&q=80&w=600" loading="lazy" alt="Gallery View 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
          {/* Img 3 */}
          <motion.div 
             initial={{ y: 80, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-t-[500px] overflow-hidden translate-y-0 shadow-2xl bg-brand-dark/5"
          >
            <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=600" loading="lazy" alt="Gallery View 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-white pb-24 border-b border-white/10"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-serif max-w-xl leading-tight w-full lg:w-1/2 text-center lg:text-left">
              Forte de son expérience<br />notre équipe vous sert
            </h2>
            <div className="w-full lg:w-1/2 flex flex-col sm:flex-row justify-between lg:justify-end gap-10 sm:gap-16 text-center sm:text-left">
              <div>
                <div className="text-4xl md:text-5xl font-serif font-semibold mb-2">800+</div>
                <div className="text-brand-muted text-sm uppercase tracking-wider">Villes</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-serif font-semibold mb-2">3500+</div>
                <div className="text-brand-muted text-sm uppercase tracking-wider">Hôtels exclusifs</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-serif font-semibold mb-2">2M</div>
                <div className="text-brand-muted text-sm uppercase tracking-wider">Chambres de luxe</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const NewsletterSection = () => {
  return (
    <section className="bg-brand-dark py-24 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[400px] md:h-[450px] rounded-[100px] md:rounded-[200px] overflow-hidden flex flex-col items-center justify-center text-center px-4 shadow-2xl border border-white/10"
        >
          <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1600" alt="Tropical Pool" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-brand-dark/40" />
          
          <div className="relative z-10 max-w-2xl mx-auto w-full">
            <p className="text-white/80 text-xs font-semibold tracking-widest uppercase mb-4">Vos offres exclusives en direct</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white mb-8 md:mb-10 tracking-tight">Abonnez-vous pour nos annonces</h2>
            
            <form className="max-w-md mx-auto relative group flex flex-col md:block gap-3">
              <input 
                type="email" 
                placeholder="Entrez votre email" 
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 px-6 py-4 rounded-full outline-none focus:bg-white/20 transition-all font-sans text-sm md:text-base"
              />
              <button 
                type="submit" 
                className="md:absolute right-2 top-1/2 md:-translate-y-1/2 bg-white text-brand-dark px-6 py-3 md:py-2.5 rounded-full font-medium hover:bg-brand-cream transition-colors font-sans text-sm w-full md:w-auto"
              >
                S'abonner
              </button>
            </form>
            <p className="text-white/50 text-xs mt-6">Sera utilisé conformément à notre Politique de confidentialité</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Amenities() {
  return (
    <>
      <Hero />
      <AmenitiesSection />
      <RoomsSection />
      <GalleryAndStats />
      <NewsletterSection />
    </>
  );
}
