import React from 'react';
import { Menu, ChevronDown, Play, BedDouble, Maximize, Users } from 'lucide-react';
import { ReactLenis } from 'lenis/react';
import { motion } from 'motion/react';

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/SharedLayout';
import Amenities from './pages/Amenities';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Rooms from './pages/Rooms';
import Contact from './pages/Contact';
import { BookingProvider } from './context/BookingContext';

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Amenities />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/home" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BookingProvider>
    </BrowserRouter>
  );
}
