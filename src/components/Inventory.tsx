import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Search, Filter, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { db, auth, signInWithGoogle } from '../lib/firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { format, isWithinInterval, parseISO, isAfter, isBefore, startOfDay } from 'date-fns';

const categories = ["All", "Ferrari", "Lamborghini", "Rolls Royce", "Porsche", "McLaren", "Bugatti", "Corvette", "Mercedes", "Cadillac"];

interface Car {
  id: number;
  name: string;
  category: string;
  price: number;
  hp: number;
  speed: string;
  image: string;
  gallery?: string[];
  description?: string;
  slideshowUrl?: string;
  requiresInsurance: boolean;
}

const cars: Car[] = [
  // NO INSURANCE REQUIRED
  { 
    id: 1, 
    name: "Lamborghini Urus", 
    category: "Lamborghini", 
    price: 1295, 
    hp: 650, 
    speed: "190 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-VQPCwzd/0/L/IMG_2922-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=6ffMMj&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 2, 
    name: "Urus with stars", 
    category: "Lamborghini", 
    price: 1395, 
    hp: 650, 
    speed: "190 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-FbwDzt/0/L/UrusStars-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=FbwDzt&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 3, 
    name: "Corvette C8 z51 2LT Coupe", 
    category: "Corvette", 
    price: 595, 
    hp: 495, 
    speed: "194 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-NNdMv5/0/L/C8-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=NNdMv5&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 4, 
    name: "2026 Corvette C8", 
    category: "Corvette", 
    price: 695, 
    hp: 495, 
    speed: "194 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-HJj29q/0/L/CorvetteC8-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=HJj29q&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 5, 
    name: "2023 Mercedes Benz AMG C43", 
    category: "Mercedes", 
    price: 495, 
    hp: 402, 
    speed: "155 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-gCT7Zn/0/L/AMG-C43-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=gCT7Zn&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 6, 
    name: "2022 Mercedes Benz AMG GT43", 
    category: "Mercedes", 
    price: 595, 
    hp: 362, 
    speed: "155 MPH", 
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=29K4mq&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 7, 
    name: "Mercedes Benz AMG GLS63", 
    category: "Mercedes", 
    price: 795, 
    hp: 603, 
    speed: "155 MPH", 
    image: "https://images.unsplash.com/photo-1511119253452-9d33267d2685?auto=format&fit=crop&q=80&w=800",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=B7GV8R&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 8, 
    name: "Mercedes Benz C300", 
    category: "Mercedes", 
    price: 295, 
    hp: 255, 
    speed: "130 MPH", 
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&q=80&w=800",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=wfngxL&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 9, 
    name: "2024 BMW M330i", 
    category: "BMW", 
    price: 395, 
    hp: 255, 
    speed: "155 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-wgkFvz/0/L/BMW330-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=wgkFvz&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 10, 
    name: "Audi a7 Fully Loaded", 
    category: "Audi", 
    price: 495, 
    hp: 335, 
    speed: "155 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-DVjswC/0/L/AudiA7-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=DVjswC&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 11, 
    name: "Genesis G70", 
    category: "Genesis", 
    price: 350, 
    hp: 252, 
    speed: "145 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-v8Xs8M/0/L/G70-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=v8Xs8M&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 12, 
    name: "Tesla Model 3", 
    category: "Tesla", 
    price: 195, 
    hp: 283, 
    speed: "140 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-7HCrm5/0/L/Tesla3-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=7HCrm5&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },

  // INSURANCE REQUIRED
  { 
    id: 101, 
    name: "Lamborghini Urus (Silver)", 
    category: "Lamborghini", 
    price: 1295, 
    hp: 650, 
    speed: "190 MPH", 
    image: "https://photos.smugmug.com/i-38GRVK/0/L/UrusSilver-L.jpg",
    requiresInsurance: true,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=38GRVK&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 102, 
    name: "Lamborghini Urus Widebody", 
    category: "Lamborghini", 
    price: 1495, 
    hp: 650, 
    speed: "190 MPH", 
    image: "https://photos.smugmug.com/i-KJdbk2/0/L/UrusWidebody-L.jpg",
    requiresInsurance: true,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=KJdbk2&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 103, 
    name: "Lamborghini Urus (Black)", 
    category: "Lamborghini", 
    price: 1295, 
    hp: 650, 
    speed: "190 MPH", 
    image: "https://photos.smugmug.com/i-qrgxZ7/0/L/UrusBlack-L.jpg",
    requiresInsurance: true,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=qrgxZ7&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 104, 
    name: "McLaren 570s Spider", 
    category: "McLaren", 
    price: 895, 
    hp: 562, 
    speed: "204 MPH", 
    requiresInsurance: true,
    image: "https://photos.smugmug.com/i-7vbk6x/0/L/570s-L.jpg",
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=7vbk6x&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 105, 
    name: "2026 Porsche 911 Targa 4S", 
    category: "Porsche", 
    price: 1295, 
    hp: 443, 
    speed: "188 MPH", 
    requiresInsurance: true,
    image: "https://photos.smugmug.com/i-zk2nSn/0/L/911Targa-L.jpg",
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=zk2nSn&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 106, 
    name: "2024 Porsche 911 Carrera", 
    category: "Porsche", 
    price: 995, 
    hp: 379, 
    speed: "182 MPH", 
    requiresInsurance: true,
    image: "https://photos.smugmug.com/i-5RBDS9/0/L/911Carrera-L.jpg",
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=5RBDS9&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 107, 
    name: "2021 Mercedes Benz Maybach GLS600", 
    category: "Mercedes", 
    price: 1195, 
    hp: 550, 
    speed: "155 MPH", 
    requiresInsurance: true,
    image: "https://photos.smugmug.com/i-B9pz2D/0/L/GLS600-L.jpg",
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=B9pz2D&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 108, 
    name: "2022 Mercedes Benz AMG SL55", 
    category: "Mercedes", 
    price: 895, 
    hp: 469, 
    speed: "183 MPH", 
    requiresInsurance: true,
    image: "https://photos.smugmug.com/i-JpPrZs/0/L/SL55-L.jpg",
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=JpPrZs&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 109, 
    name: "2024 Mercedes Benz AMG G63", 
    category: "Mercedes", 
    price: 1495, 
    hp: 577, 
    speed: "149 MPH", 
    requiresInsurance: true,
    image: "https://photos.smugmug.com/i-KfcqhV/0/L/G63-L.jpg",
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=KfcqhV&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 110, 
    name: "Tesla CyberBeast", 
    category: "Tesla", 
    price: 995, 
    hp: 845, 
    speed: "130 MPH", 
    requiresInsurance: true,
    image: "https://photos.smugmug.com/i-kbN7N5/0/L/CyberBeast-L.jpg",
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=kbN7N5&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 111, 
    name: "Range Rover HSE", 
    category: "Range Rover", 
    price: 795, 
    hp: 395, 
    speed: "130 MPH", 
    requiresInsurance: true,
    image: "https://photos.smugmug.com/i-NVXFjs/0/L/RangeRover-L.jpg",
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=NVXFjs&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 112, 
    name: "Bugatti Chiron", 
    category: "Bugatti", 
    price: 15000, 
    hp: 1479, 
    speed: "261 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-2pXFr5/0/L/Chiron-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=2pXFr5&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 113, 
    name: "McLaren 720s CUSTOM", 
    category: "McLaren", 
    price: 1895, 
    hp: 710, 
    speed: "212 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-ZhdhXm/0/L/720s-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=ZhdhXm&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 114, 
    name: "Urus Performante", 
    category: "Lamborghini", 
    price: 1595, 
    hp: 657, 
    speed: "190 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-kTtrkd/0/L/Performante-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=kTtrkd&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 115, 
    name: "Keyvany Keyrus (URUS)", 
    category: "Lamborghini", 
    price: 1995, 
    hp: 820, 
    speed: "202 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-StRbS4/0/L/Keyrus-L.jpg",
    description: "The Keyvany Keyrus is a heavily modified, ultra-exclusive version of the Lamborghini Urus, created by the German tuner Keyvany. It features comprehensive carbon fiber widebody aerodynamic enhancements, a significantly boosted engine (often 820–1000+ HP), bespoke luxury interiors, and custom 24-inch alloy wheels.",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=StRbS4&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 116, 
    name: "Lamborghini Huracán EVO", 
    category: "Lamborghini", 
    price: 1295, 
    hp: 640, 
    speed: "202 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-4qvJMX/0/L/HuracanEVO-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=4qvJMX&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 117, 
    name: "Aventador S GINTANI", 
    category: "Lamborghini", 
    price: 2495, 
    hp: 740, 
    speed: "217 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-JXvB3D/0/L/AventadorS-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=JXvB3D&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 118, 
    name: "Aventador SVJ GINTANI", 
    category: "Lamborghini", 
    price: 3495, 
    hp: 770, 
    speed: "217 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-6fRtcC/0/L/SVJ-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=6fRtcC&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 119, 
    name: "Ferrari Purosangue", 
    category: "Ferrari", 
    price: 2495, 
    hp: 715, 
    speed: "193 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-5brpZh/0/L/Purosangue-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=5brpZh&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 120, 
    name: "Tailor Made 488 SPIDER", 
    category: "Ferrari", 
    price: 1495, 
    hp: 661, 
    speed: "205 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-d9jWgh/0/L/488Spider-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=d9jWgh&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 121, 
    name: "Maybach GLS600", 
    category: "Mercedes", 
    price: 1195, 
    hp: 550, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1620127252536-03fc435eb68d?auto=format&fit=crop&q=80&w=800",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=HbsdfS&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 122, 
    name: "Maybach s580", 
    category: "Mercedes", 
    price: 995, 
    hp: 496, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=786XW2&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 123, 
    name: "Maybach s680 v12", 
    category: "Mercedes", 
    price: 1495, 
    hp: 621, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=f6szxj&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 124, 
    name: "Blackbadge Cullinan", 
    category: "Rolls Royce", 
    price: 2495, 
    hp: 591, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-pg3f27/0/L/Cullinan-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=pg3f27&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 125, 
    name: "Custom RR cullinan Tiffany Blue", 
    category: "Rolls Royce", 
    price: 2995, 
    hp: 563, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1631215233157-5b865668d90f?auto=format&fit=crop&q=80&w=800",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=kgRNbg&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 126, 
    name: "RR Dawn black badge", 
    category: "Rolls Royce", 
    price: 1895, 
    hp: 593, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1631215233157-5b865668d90f?auto=format&fit=crop&q=80&w=800",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=9WqBTK&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 127, 
    name: "Widebody G63 AMG Custom", 
    category: "Mercedes", 
    price: 1695, 
    hp: 577, 
    speed: "149 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1520050206274-a1af4463404b?auto=format&fit=crop&q=80&w=800",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=nXpxSn&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 128, 
    name: "G63 AMG 'Whiteout'", 
    category: "Mercedes", 
    price: 1595, 
    hp: 577, 
    speed: "149 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1520050206274-a1af4463404b?auto=format&fit=crop&q=80&w=800",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=pWfdTS&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 129, 
    name: "AMG G63 Two-Tone", 
    category: "Mercedes", 
    price: 1695, 
    hp: 577, 
    speed: "149 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1520050206274-a1af4463404b?auto=format&fit=crop&q=80&w=800",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=H29Fnr&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 130, 
    name: "Huracan STO", 
    category: "Lamborghini", 
    price: 1695, 
    hp: 631, 
    speed: "193 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=fP7PHD&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 131, 
    name: "C8 Z06", 
    category: "Corvette", 
    price: 995, 
    hp: 670, 
    speed: "189 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-hQ7m9c/0/L/Z06-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=hQ7m9c&speed=2&transition=fade&autoStart=1&captions=0&navigation=0&playButton=0&randomize=0&transitionSpeed=2"
  },
  { 
    id: 132, 
    name: "BMW M340i", 
    category: "BMW", 
    price: 495, 
    hp: 382, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 133, 
    name: "Porsche 911 Cabriolet", 
    category: "Porsche", 
    price: 1095, 
    hp: 379, 
    speed: "182 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800" 
  },
];

interface InventoryProps {
  onClose: () => void;
}

const Inventory: React.FC<InventoryProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Component for Car Card to avoid repetition
  const CarCard = ({ car, onClick }: { car: Car, onClick: () => void }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group relative bg-white border border-black/5 hover:border-accent/20 transition-all overflow-hidden cursor-pointer h-full flex flex-col"
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden relative">
        <motion.img 
          layoutId={`car-image-${car.id}`}
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 border border-black/10 rounded-sm">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest">Inquire</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="text-[9px] uppercase tracking-widest text-black/30 mb-2">{car.category}</div>
        <h3 className="text-xl font-bold uppercase tracking-tighter mb-6 group-hover:text-accent transition-colors text-black leading-tight line-clamp-2">{car.name}</h3>
        <div className="mt-auto grid grid-cols-2 gap-4 border-t border-black/5 pt-6">
          <div>
            <div className="text-[9px] uppercase text-black/20 tracking-widest mb-1">Horsepower</div>
            <div className="text-sm font-bold tracking-tighter text-black">{car.hp} HP</div>
          </div>
          <div>
            <div className="text-[9px] uppercase text-black/20 tracking-widest mb-1">Max Speed</div>
            <div className="text-sm font-bold tracking-tighter text-black">{car.speed}</div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      
      <button className="absolute bottom-8 right-8 w-10 h-10 bg-accent text-white rounded-sm flex items-center justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all delay-100 focus:outline-none">
        <ArrowUpRight size={18} />
      </button>
    </motion.div>
  );
  
  // Booking States
  const [user, setUser] = useState<User | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [existingBookings, setExistingBookings] = useState<any[]>([]);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookingError, setBookingError] = useState("");

  // Auth Listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Fetch Bookings for Selected Car - Only if user is signed in
  useEffect(() => {
    if (!selectedCar || !user) {
      setExistingBookings([]);
      return;
    }

    const q = query(
      collection(db, 'bookings'),
      where('carId', '==', selectedCar.id),
      where('status', 'in', ['pending', 'confirmed'])
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExistingBookings(bookings);
    });

    return () => unsub();
  }, [selectedCar]);

  // Reset booking form
  useEffect(() => {
    if (selectedCar) {
      setActiveImage(selectedCar.image);
      setStartDate("");
      setEndDate("");
      setBookingStatus('idle');
      setBookingError("");
    } else {
      setActiveImage(null);
    }
  }, [selectedCar]);

  const checkAvailability = () => {
    if (!startDate || !endDate) return true;
    const start = parseISO(startDate);
    const end = parseISO(endDate);

    if (isBefore(end, start)) return false;
    if (isBefore(start, startOfDay(new Date()))) return false;

    // Check overlaps
    for (const booking of existingBookings) {
      const bStart = parseISO(booking.startDate);
      const bEnd = parseISO(booking.endDate);

      const overlap = 
        isWithinInterval(start, { start: bStart, end: bEnd }) ||
        isWithinInterval(end, { start: bStart, end: bEnd }) ||
        isWithinInterval(bStart, { start, end }) ||
        isWithinInterval(bEnd, { start, end });
      
      if (overlap) return false;
    }
    return true;
  };

  const handleBooking = async () => {
    if (!user) {
      await signInWithGoogle();
      return;
    }

    if (!startDate || !endDate) {
      setBookingError("Please select both start and end dates.");
      return;
    }

    if (!checkAvailability()) {
      setBookingError("Selected dates are already booked. Please choose other dates.");
      return;
    }

    setBookingStatus('loading');
    setBookingError("");

    try {
      await addDoc(collection(db, 'bookings'), {
        carId: selectedCar?.id,
        startDate,
        endDate,
        userId: user.uid,
        userEmail: user.email,
        status: 'pending',
        createdAt: serverTimestamp(),
        totalPrice: selectedCar ? selectedCar.price * (Math.max(1, Math.round((parseISO(endDate).getTime() - parseISO(startDate).getTime()) / (1000 * 60 * 60 * 24)))) : 0
      });
      setBookingStatus('success');
    } catch (err) {
      console.error(err);
      setBookingStatus('error');
      setBookingError("Failed to create booking. Please try again.");
    }
  };

  const filteredCars = (cars).filter(car => 
    (activeCategory === "All" || car.category === activeCategory) &&
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-white overflow-y-auto px-6 py-10 md:px-16 text-black"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Detail Modal */}
        <AnimatePresence>
          {selectedCar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] bg-white overflow-y-auto px-6 py-10 md:px-16 flex flex-col items-center"
            >
              <div className="max-w-6xl w-full relative">
                <button 
                  onClick={() => setSelectedCar(null)}
                  className="absolute top-0 right-0 p-4 border border-black/10 rounded-full hover:bg-black/5 transition-colors z-[310]"
                >
                  <X size={24} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20">
                  {/* Gallery */}
                  <div className="space-y-4">
                    {selectedCar.slideshowUrl ? (
                      <div className="aspect-video w-full overflow-hidden border border-black/5 bg-black/5">
                        <iframe 
                          src={selectedCar.slideshowUrl} 
                          width="100%" 
                          height="100%" 
                          frameBorder="no" 
                          scrolling="no"
                          title={`${selectedCar.name} Slideshow`}
                        />
                      </div>
                    ) : (
                      <>
                        <motion.div 
                          layoutId={`car-image-${selectedCar.id}`}
                          className="aspect-video overflow-hidden border border-black/5 bg-black/5"
                        >
                          <AnimatePresence mode="wait">
                            <motion.img 
                              key={activeImage}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              src={activeImage || selectedCar.image} 
                              alt={selectedCar.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </AnimatePresence>
                        </motion.div>
                        <div className="grid grid-cols-4 gap-4">
                          {(selectedCar.gallery || [selectedCar.image]).map((img, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => setActiveImage(img)}
                              className={`aspect-video bg-black/5 overflow-hidden border cursor-pointer hover:border-accent/40 transition-all ${activeImage === img ? 'border-accent ring-2 ring-accent/20' : 'border-black/5'}`}
                            >
                              <img 
                                src={img} 
                                alt={`${selectedCar.name} thumbnail ${idx}`} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-center">
                    <div className="text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-4">{selectedCar.category}</div>
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-tight mb-8">
                      {selectedCar.name}
                    </h2>
                    
                    <div className="flex items-baseline gap-4 mb-10">
                      <span className="text-3xl font-bold text-black uppercase tracking-tighter">Inquire for Rates</span>
                      <span className="text-black/30 text-[8px] uppercase tracking-widest font-bold">Price Varies</span>
                    </div>

                    <div className="bg-accent/5 border-l-4 border-accent p-6 mb-10">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black leading-relaxed">
                        Rates are tailored to your specific needs. Pricing varies based on rental duration, insurance selection, age, and delivery location. 
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 border-y border-black/5 py-10 mb-10">
                      <div>
                        <div className="text-[10px] uppercase text-black/40 tracking-[0.2em] font-bold mb-2">Performance</div>
                        <div className="text-xl font-bold tracking-tighter">{selectedCar.hp} Horsepower</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-black/40 tracking-[0.2em] font-bold mb-2">Max Velocity</div>
                        <div className="text-xl font-bold tracking-tighter">{selectedCar.speed}</div>
                      </div>
                    </div>

                    <p className="text-black/60 leading-relaxed mb-12">
                      {selectedCar.description || "Experience the ultimate in automotive excellence with this premium vehicle. Perfectly maintained and ready for your next journey in South Florida."}
                    </p>

                    {/* Booking Form */}
                    <div className="bg-black/5 p-8 border border-black/5 mb-8">
                      <div className="flex items-center gap-2 mb-6 text-accent">
                        <Calendar size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Reserve Your Dates</span>
                      </div>

                      {bookingStatus === 'success' ? (
                        <div className="text-center py-4">
                          <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
                          <h4 className="text-xl font-bold uppercase tracking-tighter mb-2">Booking Requested!</h4>
                          <p className="text-xs text-black/40 uppercase tracking-widest leading-loose">
                            We've received your request for the {selectedCar.name}. Our team will contact you shortly to finalize details.
                          </p>
                          <button 
                            onClick={() => setSelectedCar(null)}
                            className="mt-6 text-[10px] font-bold uppercase tracking-widest text-accent border-b border-accent"
                          >
                            Return to Fleet
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[8px] uppercase tracking-widest font-bold text-black/40 mb-2">Pick-up</label>
                              <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full bg-white border border-black/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] uppercase tracking-widest font-bold text-black/40 mb-2">Return</label>
                              <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full bg-white border border-black/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                          </div>

                          {bookingError && (
                            <div className="flex items-start gap-2 bg-red-50 text-red-600 p-4 border border-red-100">
                              <Info size={14} className="mt-0.5 shrink-0" />
                              <p className="text-[10px] font-bold leading-tight">{bookingError}</p>
                            </div>
                          )}

                          {existingBookings.length > 0 && (
                            <div className="bg-accent/5 p-4 border border-accent/10">
                              <p className="text-[8px] font-bold uppercase tracking-widest text-accent mb-2">Note: This car is already booked on:</p>
                              <div className="flex flex-wrap gap-2">
                                {existingBookings.map((b, i) => (
                                  <span key={i} className="text-[10px] font-mono text-accent/60 bg-white px-2 py-1 border border-accent/5">
                                    {format(parseISO(b.startDate), 'MMM dd')} - {format(parseISO(b.endDate), 'MMM dd')}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <button 
                            onClick={handleBooking}
                            disabled={bookingStatus === 'loading'}
                            className="w-full py-6 bg-accent text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 disabled:bg-black/20"
                          >
                            {bookingStatus === 'loading' ? 'Processing...' : user ? 'Confirm Rental' : 'Sign in to Book'}
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 flex justify-between text-[8px] uppercase tracking-[0.2em] font-bold text-black/30">
                      <span>Verified Protection Required</span>
                      <span>MIA / FLL Delivery Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Header */}
        <div className="flex justify-between items-start mb-20">
          <div>
            <div className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold mb-4">NinesRentals Collection</div>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-black">
              The <span className="text-black/5 text-outline">Full</span> <br/> Fleet.
            </h2>
            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 max-w-md">
              Note: Some vehicles may not be displayed on our website. For additional availability or exclusive bookings, please contact us directly.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-4 border border-black/10 rounded-full hover:bg-black/5 transition-colors pointer-events-auto text-black"
          >
            <X size={24} />
          </button>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-center mb-16 border-b border-black/5 pb-10">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === "All" ? 'bg-accent text-white shadow-lg' : 'bg-black/5 border border-black/10 text-black/40 hover:text-black'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategory("No Insurance Required")}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === "No Insurance Required" ? 'bg-accent text-white shadow-lg' : 'bg-black/5 border border-black/10 text-black/40 hover:text-black'
              }`}
            >
              No Insurance Required
            </button>
            <button
              onClick={() => setActiveCategory("Insurance Required")}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeCategory === "Insurance Required" ? 'bg-accent text-white shadow-lg' : 'bg-black/5 border border-black/10 text-black/40 hover:text-black'
              }`}
            >
              Insurance Required
            </button>
          </div>

          <div className="relative w-full lg:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={16} />
            <input 
              type="text"
              placeholder="Search by model name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/5 border border-black/10 rounded-sm py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-accent/40 placeholder:text-black/20 text-black"
            />
          </div>
        </div>

        {/* Grid Sections */}
        <div className="space-y-24 mb-20">
          {/* No Insurance Section */}
          {(activeCategory === "All" || activeCategory === "No Insurance Required") && (
            <div>
              <div className="flex flex-col mb-10">
                <h3 className="text-3xl font-bold uppercase tracking-tighter text-black">No Insurance Required</h3>
                <div className="h-1 w-20 bg-accent mt-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {cars.filter(car => !car.requiresInsurance && car.name.toLowerCase().includes(search.toLowerCase())).map((car) => (
                    <CarCard key={car.id} car={car} onClick={() => setSelectedCar(car)} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Insurance Required Section */}
          {(activeCategory === "All" || activeCategory === "Insurance Required") && (
            <div>
              <div className="flex flex-col mb-10">
                <h3 className="text-3xl font-bold uppercase tracking-tighter text-black">Insurance Required</h3>
                <div className="h-1 w-20 bg-accent mt-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                  {cars.filter(car => car.requiresInsurance && car.name.toLowerCase().includes(search.toLowerCase())).map((car) => (
                    <CarCard key={car.id} car={car} onClick={() => setSelectedCar(car)} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-black/5 pt-10 pb-10">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent text-center">
            Rates are subject to change and vary based on duration, insurance qualification, age requirements, and seasonality.
          </p>
        </div>

        {filteredCars.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-black/20 uppercase tracking-[0.5em] text-xs">No matching vehicles found in our collection.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Inventory;
