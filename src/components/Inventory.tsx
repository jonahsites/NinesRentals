import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Search, Filter, Calendar, Info, CheckCircle2 } from 'lucide-react';
import { supabase, signInWithGoogle } from '../lib/supabase';
import { format, isWithinInterval, parseISO, isAfter, isBefore, startOfDay } from 'date-fns';
import { User } from '@supabase/supabase-js';

const categories = ["All", "Ferrari", "Lamborghini", "Rolls Royce", "Porsche", "McLaren", "Bugatti", "Corvette", "Mercedes", "Cadillac", "BMW", "Chevy", "Audi", "Genesis", "Tesla", "Range Rover"];

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
  // NO INSURANCE REQUIRED (RENTAL ONLY)
  { 
    id: 1, 
    name: "2024 Lamborghini Huracán EVO Spyder", 
    category: "Lamborghini", 
    price: 1995, 
    hp: 640, 
    speed: "202 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AAmoaFKvhvoL9X6IHD6zQ_s/2024%20Lamborghini%20huracan%20EVO%20Spyder%20Mantis%20Green-Orange%20Int/Photo%20Mar%2011%202026%2C%2011%2027%2021%20AM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AAmoaFKvhvoL9X6IHD6zQ_s/2024%20Lamborghini%20huracan%20EVO%20Spyder%20Mantis%20Green-Orange%20Int/Photo%20Mar%2011%202026%2C%2011%2027%2021%20AM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALy-CCLiboGHnm8gMigmRTM/2024%20Lamborghini%20huracan%20EVO%20Spyder%20Mantis%20Green-Orange%20Int/Photo%20Mar%2011%202026%2C%2011%2027%2021%20AM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ADBS78DHIpwfL83cJFbZiGg/2024%20Lamborghini%20huracan%20EVO%20Spyder%20Mantis%20Green-Orange%20Int/Photo%20Mar%2011%202026%2C%2011%2027%2021%20AM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AJBNbSoTH8wkZt9BuXN9eBU/2024%20Lamborghini%20huracan%20EVO%20Spyder%20Mantis%20Green-Orange%20Int/Photo%20Mar%2011%202026%2C%2011%2027%2021%20AM%20%284%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AN4B3nGu_a2dm8qVBPfTvnc/2024%20Lamborghini%20huracan%20EVO%20Spyder%20Mantis%20Green-Orange%20Int/Photo%20Mar%2011%202026%2C%2011%2027%2021%20AM%20%285%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/APCduo4OCbd1nNX9lYKuuzg/2024%20Lamborghini%20huracan%20EVO%20Spyder%20Mantis%20Green-Orange%20Int/Photo%20Mar%2011%202026%2C%2011%2027%2021%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Experience absolute performance. The Huracán EVO Spyder features the finest of Italian design and mechanical engineering in a striking Mantis Green.",
    requiresInsurance: false
  },
  { 
    id: 2, 
    name: "2026 Lamborghini Urus SE", 
    category: "Lamborghini", 
    price: 2195, 
    hp: 800, 
    speed: "194 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ABFdIcI5JdUCMy7WOGZlWU8/2026%20Lamborghini%20Urus%20SE%20Orange%20On%20Orange-black%20Int/Photo%20Mar%2011%202026%2C%2012%2005%2044%20PM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ABFdIcI5JdUCMy7WOGZlWU8/2026%20Lamborghini%20Urus%20SE%20Orange%20On%20Orange-black%20Int/Photo%20Mar%2011%202026%2C%2012%2005%2044%20PM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AKgk45v-AR5ZHlXS5mufNf8/2026%20Lamborghini%20Urus%20SE%20Orange%20On%20Orange-black%20Int/Photo%20Mar%2011%202026%2C%2012%2005%2044%20PM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALqPKRLyztdato524V_4cJA/2026%20Lamborghini%20Urus%20SE%20Orange%20On%20Orange-black%20Int/Photo%20Mar%2011%202026%2C%2012%2005%2044%20PM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AK-zRXUW7fydOclRYHN5_IE/2026%20Lamborghini%20Urus%20SE%20Orange%20On%20Orange-black%20Int/Photo%20Mar%2011%202026%2C%2012%2005%2044%20PM%20%284%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AJ2YUKnrxdbx3aK2WeUEA8I/2026%20Lamborghini%20Urus%20SE%20Orange%20On%20Orange-black%20Int/Photo%20Mar%2011%202026%2C%2012%2005%2044%20PM%20%285%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/APpKBbIoV4jz1ZQJDw3RuRg/2026%20Lamborghini%20Urus%20SE%20Orange%20On%20Orange-black%20Int/Photo%20Mar%2011%202026%2C%2012%2005%2044%20PM%20%286%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AOh2lDZmk9-gCClwTEegNN4/2026%20Lamborghini%20Urus%20SE%20Orange%20On%20Orange-black%20Int/Photo%20Mar%2011%202026%2C%2012%2005%2044%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "The next generation of the super SUV. Hybrid power meets uncompromising performance.",
    requiresInsurance: false
  },
  { 
    id: 3, 
    name: "2024 Rolls-Royce Cullinan (Black/Orange)", 
    category: "Rolls Royce", 
    price: 2195, 
    hp: 563, 
    speed: "155 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AAdNomc5WOuDaGloT3A3X1M/2024%20Rolls-Royce%20Cullinan%20Black%20On%20Orange%20With%20Stars/Photo%20Mar%2011%202026%2C%2011%2036%2022%20AM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AAdNomc5WOuDaGloT3A3X1M/2024%20Rolls-Royce%20Cullinan%20Black%20On%20Orange%20With%20Stars/Photo%20Mar%2011%202026%2C%2011%2036%2022%20AM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AF-oJPQLdexjtgWsfpatxyc/2024%20Rolls-Royce%20Cullinan%20Black%20On%20Orange%20With%20Stars/Photo%20Mar%2011%202026%2C%2011%2036%2022%20AM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AAh_pEaqxEMFSh76fEVIHJk/2024%20Rolls-Royce%20Cullinan%20Black%20On%20Orange%20With%20Stars/Photo%20Mar%2011%202026%2C%2011%2036%2022%20AM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMtxqeu7iTUU_Pq85sAQft0/2024%20Rolls-Royce%20Cullinan%20Black%20On%20Orange%20With%20Stars/Photo%20Mar%2011%202026%2C%2011%2036%2022%20AM%20%284%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AN7oUJ24ELOgWr80YpR6szU/2024%20Rolls-Royce%20Cullinan%20Black%20On%20Orange%20With%20Stars/Photo%20Mar%2011%202026%2C%2011%2036%2022%20AM%20%285%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ACHoP3ngjhjk-cU8KTfuYiE/2024%20Rolls-Royce%20Cullinan%20Black%20On%20Orange%20With%20Stars/Photo%20Mar%2011%202026%2C%2011%2036%2022%20AM%20%286%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AEuJwMvZUlCShklp9e3LCbw/2024%20Rolls-Royce%20Cullinan%20Black%20On%20Orange%20With%20Stars/Photo%20Mar%2011%202026%2C%2011%2036%2022%20AM%20%287%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AKW5l9NYneRuDcB4R9lSVLY/2024%20Rolls-Royce%20Cullinan%20Black%20On%20Orange%20With%20Stars/Photo%20Mar%2011%202026%2C%2011%2036%2022%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Luxury without limits. Features a custom starlight headliner and a vibrant orange interior.",
    requiresInsurance: false
  },
  { 
    id: 4, 
    name: "2025 Rolls-Royce Spectre", 
    category: "Rolls Royce", 
    price: 2495, 
    hp: 577, 
    speed: "155 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AO_qU1UsIk58VkiuNNKLoAY/2025%20Rolls-Royce%20spectre%20Blue%20On%20Two%20Tome%20White%20Int/Photo%20Mar%2011%202026%2C%2012%2004%2037%20PM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AO_qU1UsIk58VkiuNNKLoAY/2025%20Rolls-Royce%20spectre%20Blue%20On%20Two%20Tome%20White%20Int/Photo%20Mar%2011%202026%2C%2012%2004%2037%20PM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AIxtmwGa0WvUsfMfB9J0Vu4/2025%20Rolls-Royce%20spectre%20Blue%20On%20Two%20Tome%20White%20Int/Photo%20Mar%2011%202026%2C%2012%2004%2037%20PM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AGgzD0D73r41AQNd7n3aA4E/2025%20Rolls-Royce%20spectre%20Blue%20On%20Two%20Tome%20White%20Int/Photo%20Mar%2011%202026%2C%2012%2004%2037%20PM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AFQRGtgFuCOFDGTgCF8wtcM/2025%20Rolls-Royce%20spectre%20Blue%20On%20Two%20Tome%20White%20Int/Photo%20Mar%2011%202026%2C%2012%2004%2037%20PM%20%284%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AB-LROkmUISHCwfgBKKxvaM/2025%20Rolls-Royce%20spectre%20Blue%20On%20Two%20Tome%20White%20Int/Photo%20Mar%2011%202026%2C%2012%2004%2037%20PM%20%285%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ANhR-tsoYR_u0VD41nf7vYI/2025%20Rolls-Royce%20spectre%20Blue%20On%20Two%20Tome%20White%20Int/Photo%20Mar%2011%202026%2C%2012%2004%2037%20PM%20%286%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ACkChTOyjoI24y2inP8qlCc/2025%20Rolls-Royce%20spectre%20Blue%20On%20Two%20Tome%20White%20Int/Photo%20Mar%2011%202026%2C%2012%2004%2037%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "The first ultra-luxury electric super coupé. A spiritual successor to the Phantom Coupé.",
    requiresInsurance: false
  },
  { 
    id: 5, 
    name: "2024 Lamborghini Urus S (Red/Red)", 
    category: "Lamborghini", 
    price: 1895, 
    hp: 657, 
    speed: "190 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AKcq1XtuKRq9YmXzTmNlUmM/2024%20Lamborghini%20Urus%20S%20Red%20On%20Red%20Two%20Tone%20Int/Photo%20Mar%2011%202026%2C%2012%2002%2003%20PM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AKcq1XtuKRq9YmXzTmNlUmM/2024%20Lamborghini%20Urus%20S%20Red%20On%20Red%20Two%20Tone%20Int/Photo%20Mar%2011%202026%2C%2012%2002%2003%20PM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ACfheMaPlOE-Gs8kcQfocsc/2024%20Lamborghini%20Urus%20S%20Red%20On%20Red%20Two%20Tone%20Int/Photo%20Mar%2011%202026%2C%2012%2002%2003%20PM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMasv-SIwogoY7qOHSq7YeM/2024%20Lamborghini%20Urus%20S%20Red%20On%20Red%20Two%20Tone%20Int/Photo%20Mar%2011%202026%2C%2012%2002%2003%20PM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AA7AcYF0GtW6ylrkgbaQSyM/2024%20Lamborghini%20Urus%20S%20Red%20On%20Red%20Two%20Tone%20Int/Photo%20Mar%2011%202026%2C%2012%2002%2003%20PM%20%284%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ADrIhf64U_vWvO2P0cdzafc/2024%20Lamborghini%20Urus%20S%20Red%20On%20Red%20Two%20Tone%20Int/Photo%20Mar%2011%202026%2C%2012%2002%2003%20PM%20%285%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AJkD7-Q2VkarnSkernGm2mk/2024%20Lamborghini%20Urus%20S%20Red%20On%20Red%20Two%20Tone%20Int/Photo%20Mar%2011%202026%2C%2012%2002%2003%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Maximum versatility and performance. The Urus S is the perfect evolution of the super SUV.",
    requiresInsurance: false
  },
  { 
    id: 6, 
    name: "2025 Maybach GLS 600 (Matte Black)", 
    category: "Mercedes", 
    price: 1595, 
    hp: 550, 
    speed: "155 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AP5hWFencWOpRGux9TIRcv8/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2002%2002%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AP5hWFencWOpRGux9TIRcv8/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2002%2002%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AGLkE1Nnx04aGWjHdWhdELo/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2002%2010%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AL5nVzhQhvhGOf8-JKwoSt0/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2002%2017%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMOYE6c3gaHNjA5-SzJNw4w/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2002%2040%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AOHANHoo19mINJP5Fk5yP-Q/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2004%2030%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMegbjmXixy7DWNR2rpFLNg/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2004%2034%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALSu4BN-M_KEL6e-TtTautA/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2004%2043%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ANf2Uwk6oefeMczfuwnOMb8/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2004%2048%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ACKHFePOGweaoPp0faXDemI/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2005%2001%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AHAWgbItVLduHHBH_gCcqGY/2025%20Maybach%20GLS%20600%20matte%20black%20w%20TVs/Photo%20Feb%2016%202026%2C%202%2005%2016%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "The ultimate expression of luxury. Features rear entertainment TVs and a stealthy matte black finish.",
    requiresInsurance: false
  },
  { 
    id: 7, 
    name: "2021 Maybach GLS 600 (2-Tone)", 
    category: "Mercedes", 
    price: 1295, 
    hp: 550, 
    speed: "155 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALi8vstkGVFfp4nm6Np_VPI/2021%20Maybach%20GLS%20600%202Tone%20Gray-white/Photo%20Mar%2011%202026%2C%2011%2005%2007%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AC_IYleHKUybXoBTWNGWjzc/2021%20Maybach%20GLS%20600%202Tone%20Gray-white/Photo%20Mar%2011%202026%2C%2011%2005%2007%20AM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALEMID6octTKQ0JrlHWx_Dc/2021%20Maybach%20GLS%20600%202Tone%20Gray-white/Photo%20Mar%2011%202026%2C%2011%2005%2007%20AM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ACov3SR-iW7_z1ERzv36hOc/2021%20Maybach%20GLS%20600%202Tone%20Gray-white/Photo%20Mar%2011%202026%2C%2011%2005%2007%20AM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ABaenUEd7ioWgmFO_wLA05A/2021%20Maybach%20GLS%20600%202Tone%20Gray-white/Photo%20Mar%2011%202026%2C%2011%2005%2007%20AM%20%284%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AOWdKH23sJKOS5g7W3dNLJU/2021%20Maybach%20GLS%20600%202Tone%20Gray-white/Photo%20Mar%2011%202026%2C%2011%2005%2007%20AM%20%285%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AKE-w3DFRNyi3pF3N1IDP8U/2021%20Maybach%20GLS%20600%202Tone%20Gray-white/Photo%20Mar%2011%202026%2C%2011%2005%2007%20AM%20%286%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/APZjrVvJN0-L4ojVdPfftZM/2021%20Maybach%20GLS%20600%202Tone%20Gray-white/Photo%20Mar%2011%202026%2C%2011%2005%2007%20AM%20%287%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALi8vstkGVFfp4nm6Np_VPI/2021%20Maybach%20GLS%20600%202Tone%20Gray-white/Photo%20Mar%2011%202026%2C%2011%2005%2007%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Sophistication in two tones. The Maybach GLS 600 redefines what an SUV can be.",
    requiresInsurance: false
  },
  { 
    id: 8, 
    name: "2025 Corvette Z06 (White/Red)", 
    category: "Corvette", 
    price: 1395, 
    hp: 670, 
    speed: "189 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALk4tAwvtLhquZAHSjnqNko/2025%20Corvette%20Z06%20white%20on%20red%20buckets/Photo%20Feb%2017%202026%2C%203%2004%2026%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALk4tAwvtLhquZAHSjnqNko/2025%20Corvette%20Z06%20white%20on%20red%20buckets/Photo%20Feb%2017%202026%2C%203%2004%2026%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AHVpDMQDUKwdoqj6G16F7VY/2025%20Corvette%20Z06%20white%20on%20red%20buckets/Photo%20Feb%2017%202026%2C%203%2004%2036%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AFPW838CpKqGg1Oh2mhzttM/2025%20Corvette%20Z06%20white%20on%20red%20buckets/Photo%20Feb%2017%202026%2C%203%2004%2041%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AC535gG8xqMg2Bf_Ibj-BWk/2025%20Corvette%20Z06%20white%20on%20red%20buckets/Photo%20Feb%2017%202026%2C%203%2004%2050%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AM5maJl4_DFBh7g0duatH98/2025%20Corvette%20Z06%20white%20on%20red%20buckets/Photo%20Feb%2017%202026%2C%203%2004%2058%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AEJsL9HFr5F451j_NdAQ1-E/2025%20Corvette%20Z06%20white%20on%20red%20buckets/Photo%20Feb%2017%202026%2C%203%2005%2010%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AHV2CnKInRfEHdbjqE_ccvs/2025%20Corvette%20Z06%20white%20on%20red%20buckets/Photo%20Feb%2017%202026%2C%203%2005%2014%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AJfNFG0qfsUn8VR6jkwwibI/2025%20Corvette%20Z06%20white%20on%20red%20buckets/Photo%20Feb%2017%202026%2C%203%2005%2020%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Mid-engine masterpiece. The Z06 features the most powerful naturally aspirated V8.",
    requiresInsurance: false
  },
  { 
    id: 9, 
    name: "2024 Mercedes G63 (Copper)", 
    category: "Mercedes", 
    price: 1695, 
    hp: 577, 
    speed: "137 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALV6JeL-B6Dih0pIjD87Nds/2024%20Mercedes%20G63%20Copper%20w%20black%20interior/Photo%20Jan%2029%202026%2C%203%2045%2040%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALV6JeL-B6Dih0pIjD87Nds/2024%20Mercedes%20G63%20Copper%20w%20black%20interior/Photo%20Jan%2029%202026%2C%203%2045%2040%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALBj0XmmU8KJfPWjqQF2WB8/2024%20Mercedes%20G63%20Copper%20w%20black%20interior/Photo%20Jan%2029%202026%2C%203%2045%2040%20PM%20%281%29%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AH874T3Vdqid4awgQH9RIrg/2024%20Mercedes%20G63%20Copper%20w%20black%20interior/Photo%20Jan%2029%202026%2C%203%2045%2040%20PM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/APGWqw3YZ-Zq0lR3-EF7cKI/2024%20Mercedes%20G63%20Copper%20w%20black%20interior/Photo%20Jan%2029%202026%2C%203%2045%2040%20PM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AH0VxnfHHHyeXVjoSY_5sO4/2024%20Mercedes%20G63%20Copper%20w%20black%20interior/Photo%20Jan%2029%202026%2C%203%2045%2040%20PM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ABfqU_kEreHSNDe0BP1McKs/2024%20Mercedes%20G63%20Copper%20w%20black%20interior/Photo%20Jan%2029%202026%2C%203%2045%2040%20PM%20%284%29%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ADwrQ78Ph9lrxDv8jlqC-mY/2024%20Mercedes%20G63%20Copper%20w%20black%20interior/Photo%20Jan%2029%202026%2C%203%2045%2040%20PM%20%284%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Iconic design in a unique copper finish. The G63 remains the king of performance SUVs.",
    requiresInsurance: false
  },
  { 
    id: 10, 
    name: "2022 Mercedes G63 AMG (Black/Red)", 
    category: "Mercedes", 
    price: 1595, 
    hp: 577, 
    speed: "137 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ABYGrTXdEvYmCThx52pHYA0/2022%20Mercedes%20benz%20G63%20AMG%20Black%20On%20Red%20Int/Photo%20Mar%2011%202026%2C%2012%2006%2045%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ABYGrTXdEvYmCThx52pHYA0/2022%20Mercedes%20benz%20G63%20AMG%20Black%20On%20Red%20Int/Photo%20Mar%2011%202026%2C%2012%2006%2045%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AGTc91ALNQm9HkpU8GJaj-Y/2022%20Mercedes%20benz%20G63%20AMG%20Black%20On%20Red%20Int/Photo%20Mar%2011%202026%2C%2012%2006%2045%20PM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AOf13ifz6dExbtAp_F4jS98/2022%20Mercedes%20benz%20G63%20AMG%20Black%20On%20Red%20Int/Photo%20Mar%2011%202026%2C%2012%2006%2045%20PM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AL1mkvnVnACyLiuYa8uDUTg/2022%20Mercedes%20benz%20G63%20AMG%20Black%20On%20Red%20Int/Photo%20Mar%2011%202026%2C%2012%2006%2045%20PM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AJw_XnakNkErWcxqtnT_zMQ/2022%20Mercedes%20benz%20G63%20AMG%20Black%20On%20Red%20Int/Photo%20Mar%2011%202026%2C%2012%2006%2045%20PM%20%284%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AK_8M3bM1OldjTs_mXTPb9k/2022%20Mercedes%20benz%20G63%20AMG%20Black%20On%20Red%20Int/Photo%20Mar%2011%202026%2C%2012%2006%2045%20PM%20%285%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMfu708JoRMo1fjTldA2_7M/2022%20Mercedes%20benz%20G63%20AMG%20Black%20On%20Red%20Int/Photo%20Mar%2011%202026%2C%2012%2006%2045%20PM%20%286%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "The classic G-Wagon performance. Black exterior with a bold red interior.",
    requiresInsurance: false
  },
  { 
    id: 11, 
    name: "2025 Cadillac Escalade ESV (TVs)", 
    category: "Cadillac", 
    price: 1395, 
    hp: 420, 
    speed: "130 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AIGhpfw3_HtcpqSU9SxFc44/2025%20Escalade%20ESV%20w%20TVs/Photo%20Dec%2003%202025%2C%2012%2001%2047%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ADabrG5eqZ0C5NOEqJ6pSV4/2025%20Escalade%20ESV%20w%20TVs/Photo%20Dec%2003%202025%2C%2012%2001%2047%20AM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AAoRcopQs1cUL40miZH0TS8/2025%20Escalade%20ESV%20w%20TVs/Photo%20Dec%2003%202025%2C%2012%2001%2047%20AM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AE-c4Zzz539RidVyRad6dRY/2025%20Escalade%20ESV%20w%20TVs/Photo%20Dec%2003%202025%2C%2012%2001%2047%20AM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AO76pGkACa6U0c65I2ZuCFk/2025%20Escalade%20ESV%20w%20TVs/Photo%20Dec%2003%202025%2C%2012%2001%2047%20AM%20%284%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ADz3a_nif1bNvR8PFW483dY/2025%20Escalade%20ESV%20w%20TVs/Photo%20Dec%2003%202025%2C%2012%2001%2047%20AM%20%285%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMIyKwy6lkS7lOsXGTMU71g/2025%20Escalade%20ESV%20w%20TVs/Photo%20Dec%2003%202025%2C%2012%2001%2047%20AM%20%286%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ADraUarws3RIn0bqFEh-a7o/2025%20Escalade%20ESV%20w%20TVs/Photo%20Dec%2003%202025%2C%2012%2001%2047%20AM%20%287%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ANJ7VlqJjaLhXt7VMOv7Baw/2025%20Escalade%20ESV%20w%20TVs/Photo%20Dec%2003%202025%2C%2012%2001%2047%20AM%20%288%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AIGhpfw3_HtcpqSU9SxFc44/2025%20Escalade%20ESV%20w%20TVs/Photo%20Dec%2003%202025%2C%2012%2001%2047%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Fully loaded for the family or the crew. Features rear entertainment screens for every passenger.",
    requiresInsurance: false
  },
  { 
    id: 12, 
    name: "2023 Cadillac Escalade V (Panda)", 
    category: "Cadillac", 
    price: 1495, 
    hp: 682, 
    speed: "150 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/APc7bW2HF9KyWHjGz8VhUnA/2023%20Escalade%20V%20panda/Photo%20Sep%2024%202025%2C%203%2028%2014%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ADSdPv8koHQhy4T_pvaJFJE/2023%20Escalade%20V%20panda/Photo%20Sep%2024%202025%2C%203%2028%2013%20PM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AI77coT3PpZKC8oqy3L5Om0/2023%20Escalade%20V%20panda/Photo%20Sep%2024%202025%2C%203%2028%2013%20PM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AJodBxQD9tzMJ7-gZnKHB3M/2023%20Escalade%20V%20panda/Photo%20Sep%2024%202025%2C%203%2028%2013%20PM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AFQQnlX6pCHN5OXfvXKhos4/2023%20Escalade%20V%20panda/Photo%20Sep%2024%202025%2C%203%2028%2013%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AKO1t1K0tLVrwjw7Gto_rgc/2023%20Escalade%20V%20panda/Photo%20Sep%2024%202025%2C%203%2028%2014%20PM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALf2MkVBZn_SDFZGlyjbO5Q/2023%20Escalade%20V%20panda/Photo%20Sep%2024%202025%2C%203%2028%2014%20PM%20%282%29%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ACgGheL5vsQRaRS7tFFwurM/2023%20Escalade%20V%20panda/Photo%20Sep%2024%202025%2C%203%2028%2014%20PM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "The most powerful full-size SUV. Hear the roar of the supercharged V8.",
    requiresInsurance: false
  },
  { 
    id: 13, 
    name: "2017 McLaren 570S Spider (Black/Red)", 
    category: "McLaren", 
    price: 1195, 
    hp: 562, 
    speed: "204 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AEtzH5N4dSteunhZGI94M1Y/2017%20Mclaren%20570s%20black%20on%20black-red%20interior/Photo%20Mar%2008%202026%2C%201%2025%2012%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AEtzH5N4dSteunhZGI94M1Y/2017%20Mclaren%20570s%20black%20on%20black-red%20interior/Photo%20Mar%2008%202026%2C%201%2025%2012%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMWTdu5nii96wlP8DDJj3Zo/2017%20Mclaren%20570s%20black%20on%20black-red%20interior/Photo%20Mar%2008%202026%2C%201%2025%2022%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AEqefh0HMH6O2uDxCJs-u5s/2017%20Mclaren%20570s%20black%20on%20black-red%20interior/Photo%20Mar%2008%202026%2C%201%2025%2036%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AITU4W9Y_diuA7GXY0XhQTs/2017%20Mclaren%20570s%20black%20on%20black-red%20interior/Photo%20Mar%2008%202026%2C%201%2025%2046%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AKOb4iwKMkH9DgHC5ezal1U/2017%20Mclaren%20570s%20black%20on%20black-red%20interior/Photo%20Mar%2008%202026%2C%201%2026%2002%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AHhSIkvs7uyczhIyaNgd_O0/2017%20Mclaren%20570s%20black%20on%20black-red%20interior/Photo%20Mar%2008%202026%2C%201%2026%2014%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Raw performance meets open-top luxury. Black exterior with a striking red interior.",
    requiresInsurance: false
  },
  { 
    id: 14, 
    name: "2020 Lamborghini Urus (Panda/Stars)", 
    category: "Lamborghini", 
    price: 1695, 
    hp: 650, 
    speed: "190 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ANIwaoUllmcPJ2hh-R0jUJA/2020%20Lambo%20Urus%20white%20panda%20with%20stars%20%E2%9C%A8/Photo%20Jul%2010%202025%2C%2011%2025%2018%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ANIwaoUllmcPJ2hh-R0jUJA/2020%20Lambo%20Urus%20white%20panda%20with%20stars%20%E2%9C%A8/Photo%20Jul%2010%202025%2C%2011%2025%2018%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AImtTXjued2SNdKq1iylYGY/2020%20Lambo%20Urus%20white%20panda%20with%20stars%20%E2%9C%A8/Photo%20Jul%2010%202025%2C%2011%2026%2002%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AN8Wht0hQ0sNsD9izzzttBY/2020%20Lambo%20Urus%20white%20panda%20with%20stars%20%E2%9C%A8/Photo%20Jul%2010%202025%2C%2011%2026%2003%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AJKODrgnZp5jJzzYyeN7fco/2020%20Lambo%20Urus%20white%20panda%20with%20stars%20%E2%9C%A8/Photo%20Jun%2024%202025%2C%2010%2030%2037%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/APKK40fPFJ6kgou5JfGAHrc/2020%20Lambo%20Urus%20white%20panda%20with%20stars%20%E2%9C%A8/Photo%20Jun%2024%202025%2C%2010%2030%2040%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Custom starlight headliner in a panda spec Urus. Turn heads wherever you go.",
    requiresInsurance: false
  },
  { 
    id: 15, 
    name: "2021 Corvette C8 (Midnight Purple)", 
    category: "Corvette", 
    price: 1095, 
    hp: 495, 
    speed: "194 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AFNfVgGyT8govJCxYK3jiDk/2021%20Corvette%20C8%20Midnight%20purple%20on%20Red%20convertible/Photo%20May%2015%202025%2C%2011%2025%2009%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AFNfVgGyT8govJCxYK3jiDk/2021%20Corvette%20C8%20Midnight%20purple%20on%20Red%20convertible/Photo%20May%2015%202025%2C%2011%2025%2009%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AP7q7Bg1PmtX_fNDWPl-u1Y/2021%20Corvette%20C8%20Midnight%20purple%20on%20Red%20convertible/Photo%20May%2015%202025%2C%2011%2025%2015%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AOm68YRqjaGbXYRqtazAIwM/2021%20Corvette%20C8%20Midnight%20purple%20on%20Red%20convertible/Photo%20Nov%2012%202025%2C%204%2005%2059%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AKRTJpzmmybryWHA2iNYKug/2021%20Corvette%20C8%20Midnight%20purple%20on%20Red%20convertible/Photo%20Nov%2012%202025%2C%204%2006%2005%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Striking Midnight Purple exterior with a Red interior. The first mid-engine Corvette convertible.",
    requiresInsurance: false
  },
  { 
    id: 16, 
    name: "2022 BMW i7 M60i", 
    category: "BMW", 
    price: 995, 
    hp: 536, 
    speed: "155 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMjH2EVtbI7uEZr3ja9aHDo/2022%20BMW%20i7%20M60i%20Black%20On%20Black%20Interior/Photo%20Mar%2009%202026%2C%207%2016%2046%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMjH2EVtbI7uEZr3ja9aHDo/2022%20BMW%20i7%20M60i%20Black%20On%20Black%20Interior/Photo%20Mar%2009%202026%2C%207%2016%2046%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALBTDmSfyJ9tUYC2rjHZNdQ/2022%20BMW%20i7%20M60i%20Black%20On%20Black%20Interior/Photo%20Mar%2009%202026%2C%207%2016%2050%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AEIj11ncaKlanui_9S0S3xs/2022%20BMW%20i7%20M60i%20Black%20On%20Black%20Interior/Photo%20Mar%2009%202026%2C%207%2016%2055%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AM-tFuClDobQGoneYLfRN38/2022%20BMW%20i7%20M60i%20Black%20On%20Black%20Interior/Photo%20Mar%2009%202026%2C%207%2017%2020%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "The pinnacle of electric luxury. Experience the future of BMW.",
    requiresInsurance: false
  },
  { 
    id: 17, 
    name: "2022 Cadillac Escalade ESV (Stars)", 
    category: "Cadillac", 
    price: 1095, 
    hp: 420, 
    speed: "130 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ADjmTD5WT-of6BguaY3WSJc/2022%20Cadillac%20Escalade%20ESV%20w%20stars%20%E2%9C%A8/Photo%20Jun%2019%202025%2C%201%2058%2055%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ADjmTD5WT-of6BguaY3WSJc/2022%20Cadillac%20Escalade%20ESV%20w%20stars%20%E2%9C%A8/Photo%20Jun%2019%202025%2C%201%2058%2055%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ABmTYbQ9Q5kozU6cqcLTuOc/2022%20Cadillac%20Escalade%20ESV%20w%20stars%20%E2%9C%A8/Photo%20Jun%2019%202025%2C%201%2059%2020%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALdctWq2u-i6JuoyU3leQ6I/2022%20Cadillac%20Escalade%20ESV%20w%20stars%20%E2%9C%A8/Photo%20Jun%2019%202025%2C%201%2059%2053%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AGYpsJ1lKfvnNide_ii0x-M/2022%20Cadillac%20Escalade%20ESV%20w%20stars%20%E2%9C%A8/Photo%20Jun%2019%202025%2C%207%2050%2043%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Luxury ESV model with a custom starlight headliner. Ultimate comfort and style.",
    requiresInsurance: false
  },
  { 
    id: 18, 
    name: "2022 Maybach S580 (2-Tone)", 
    category: "Mercedes", 
    price: 1395, 
    hp: 496, 
    speed: "155 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AGy9oHLdIobpoh5X70VrbUg/2022%20Maybach%20S580%202tone%20Blk-Wht%20On%20White%20Int/Photo%20Mar%2011%202026%2C%2011%2011%2051%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AJQLi2F94jAsA_AXd5jpXxw/2022%20Maybach%20S580%202tone%20Blk-Wht%20On%20White%20Int/Photo%20Mar%2011%202026%2C%2011%2011%2051%20AM%20%281%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AP1xWJQiTb7tkwCmAteKR8s/2022%20Maybach%20S580%202tone%20Blk-Wht%20On%20White%20Int/Photo%20Mar%2011%202026%2C%2011%2011%2051%20AM%20%282%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMi6PIzdAWBoV5H4qDzRfGg/2022%20Maybach%20S580%202tone%20Blk-Wht%20On%20White%20Int/Photo%20Mar%2011%202026%2C%2011%2011%2051%20AM%20%283%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AC42z4nE5CvfXCf6Z5A9LGw/2022%20Maybach%20S580%202tone%20Blk-Wht%20On%20White%20Int/Photo%20Mar%2011%202026%2C%2011%2011%2051%20AM%20%284%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AOIoDy8btbYk4I1HkFRvhUY/2022%20Maybach%20S580%202tone%20Blk-Wht%20On%20White%20Int/Photo%20Mar%2011%202026%2C%2011%2011%2051%20AM%20%285%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AG20bs5yj021qUKPyG3gtYI/2022%20Maybach%20S580%202tone%20Blk-Wht%20On%20White%20Int/Photo%20Mar%2011%202026%2C%2011%2011%2051%20AM%20%286%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMoqfkuBnZCmAqfFelxnWIc/2022%20Maybach%20S580%202tone%20Blk-Wht%20On%20White%20Int/Photo%20Mar%2011%202026%2C%2011%2011%2051%20AM%20%287%29.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AGy9oHLdIobpoh5X70VrbUg/2022%20Maybach%20S580%202tone%20Blk-Wht%20On%20White%20Int/Photo%20Mar%2011%202026%2C%2011%2011%2051%20AM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "The most luxurious sedan. Black and white exterior with a pristine white interior.",
    requiresInsurance: false
  },
  { 
    id: 19, 
    name: "2022 BMW 540i (Stars)", 
    category: "BMW", 
    price: 695, 
    hp: 335, 
    speed: "155 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ANHQ4o4srTLiqwVUiEUtUEY/2022%20BMW%205%20series%20540i%20w%20stars/Photo%20Dec%2012%202025%2C%207%2028%2016%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ANHQ4o4srTLiqwVUiEUtUEY/2022%20BMW%205%20series%20540i%20w%20stars/Photo%20Dec%2012%202025%2C%207%2028%2016%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ALj0LuR6d0by9kPErlch_rI/2022%20BMW%205%20series%20540i%20w%20stars/Photo%20Dec%2012%202025%2C%207%2028%2025%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AL6lOKQacfxfd_wFkb8TMPU/2022%20BMW%205%20series%20540i%20w%20stars/Photo%20Jan%2029%202026%2C%2011%2010%2037%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AKtJ0Pz8rDE0fZ2eDlY4Vks/2022%20BMW%205%20series%20540i%20w%20stars/Photo%20Nov%2024%202025%2C%201%2047%2005%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Luxury sedan with a custom starlight headliner. Perfect balance of sport and comfort.",
    requiresInsurance: false
  },
  { 
    id: 20, 
    name: "2023 Chevy Tahoe RST", 
    category: "Chevy", 
    price: 595, 
    hp: 355, 
    speed: "130 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AO9REQ-iiOg51vc23YdXLHM/2023%20Chevy%20Tahoe%20RST/Photo%20Jun%2028%202025%2C%205%2053%2028%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AO9REQ-iiOg51vc23YdXLHM/2023%20Chevy%20Tahoe%20RST/Photo%20Jun%2028%202025%2C%205%2053%2028%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ACKj2I6D007s3OOtg1Tnazs/2023%20Chevy%20Tahoe%20RST/Photo%20Jun%2028%202025%2C%205%2053%2035%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ACl1RkJz9Y9Rzm_bNmK38Xk/2023%20Chevy%20Tahoe%20RST/Photo%20Jun%2028%202025%2C%205%2053%2042%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMfrx5OzqPtV5c9rtqnpdcg/2023%20Chevy%20Tahoe%20RST/Photo%20Jun%2028%202025%2C%205%2054%2034%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Sporty and spacious. The Tahoe RST provides power and presence.",
    requiresInsurance: false
  },
  { 
    id: 21, 
    name: "2025 Mercedes C63S AMG", 
    category: "Mercedes", 
    price: 895, 
    hp: 671, 
    speed: "174 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AH9FdA3L0MSghDuqcrYYFGc/2025%20Mercedes-Benz%20C63s%20AMG%20white%20on%20black/Photo%20Feb%2007%202026%2C%2010%2031%2036%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AH9FdA3L0MSghDuqcrYYFGc/2025%20Mercedes-Benz%20C63s%20AMG%20white%20on%20black/Photo%20Feb%2007%202026%2C%2010%2031%2036%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ANPhWAqubiscAiFAjajlfMY/2025%20Mercedes-Benz%20C63s%20AMG%20white%20on%20black/Photo%20Feb%2007%202026%2C%2010%2031%2040%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AMJjLGwXk8kD7RjrBR0xmzE/2025%20Mercedes-Benz%20C63s%20AMG%20white%20on%20black/Photo%20Feb%2007%202026%2C%2010%2031%2049%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ABr3QpelC-D4IQfl7TuWNho/2025%20Mercedes-Benz%20C63s%20AMG%20white%20on%20black/Photo%20Feb%2007%202026%2C%2010%2032%2001%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "The next generation of AMG performance. Hybrid power with incredible acceleration.",
    requiresInsurance: false
  },
  { 
    id: 22, 
    name: "2024 Range Rover P530", 
    category: "Range Rover", 
    price: 1395, 
    hp: 523, 
    speed: "155 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AAp93B7h5N98dMvU1f4_zJk/2024%20Range%20Rover%20P530/Photo%20Aug%2029%202025%2C%206%2022%2013%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AAp93B7h5N98dMvU1f4_zJk/2024%20Range%20Rover%20P530/Photo%20Aug%2029%202025%2C%206%2022%2013%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AFA-u96IieIicD8O2mPzC08/2024%20Range%20Rover%20P530/Photo%20Aug%2029%202025%2C%206%2022%2015%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AL8-eIdSNoLz12oZ-b_t7Y8/2024%20Range%20Rover%20P530/Photo%20Aug%2029%202025%2C%206%2022%2016%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AO1f40_V7A3I9iCjYy_P3o0/2024%20Range%20Rover%20P530/Photo%20Aug%2029%202025%2C%206%2022%2018%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "The benchmark of luxury SUVs. Unmatched elegance and capability.",
    requiresInsurance: false
  },
  { 
    id: 23, 
    name: "2023 Mercedes GLS63 AMG Silver", 
    category: "Mercedes", 
    price: 995, 
    hp: 603, 
    speed: "155 MPH", 
    image: "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AAIdvG7-wE-hUAnB_1Y_Nsc/2023%20Mercedes%20GLS63%20AMG%20Silver/Photo%20Jun%2015%202025%2C%204%2033%2003%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
    gallery: [
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AAIdvG7-wE-hUAnB_1Y_Nsc/2023%20Mercedes%20GLS63%20AMG%20Silver/Photo%20Jun%2015%202025%2C%204%2033%2003%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/ADvD9-f8p4eEnS28eW_8H_c/2023%20Mercedes%20GLS63%20AMG%20Silver/Photo%20Jun%2015%202025%2C%204%2033%2005%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AHjHogpT6mZ9YxId8n5o68k/2023%20Mercedes%20GLS63%20AMG%20Silver/Photo%20Jun%2015%202025%2C%204%2033%2008%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1",
      "https://dl.dropboxusercontent.com/scl/fo/f9elxbsia1y8p492nvzxg/AC9Ym3j9I2_Yp9h5pXjP788/2023%20Mercedes%20GLS63%20AMG%20Silver/Photo%20Jun%2015%202025%2C%204%2033%2011%20PM.jpg?rlkey=1lh7bgh0uoa0v7su37kj5e7yx&raw=1"
    ],
    description: "Combine AMG performance with seven-seat luxury. Elegant silver finish.",
    requiresInsurance: false
  },
  { 
    id: 30, 
    name: "Lamborghini Urus", 
    category: "Lamborghini", 
    price: 1295, 
    hp: 650, 
    speed: "190 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-VQPCwzd/0/L/IMG_2922-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=6ffMMj&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 31, 
    name: "Urus with stars", 
    category: "Lamborghini", 
    price: 1395, 
    hp: 650, 
    speed: "190 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-FbwDzt/0/L/UrusStars-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=FbwDzt&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 32, 
    name: "Corvette C8 z51 2LT Coupe", 
    category: "Corvette", 
    price: 595, 
    hp: 495, 
    speed: "194 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-NNdMv5/0/L/C8-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=NNdMv5&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 33, 
    name: "2026 Corvette C8", 
    category: "Corvette", 
    price: 695, 
    hp: 495, 
    speed: "194 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-HJj29q/0/L/CorvetteC8-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=HJj29q&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 34, 
    name: "2023 Mercedes Benz AMG C43", 
    category: "Mercedes", 
    price: 495, 
    hp: 402, 
    speed: "155 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-gCT7Zn/0/L/AMG-C43-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=gCT7Zn&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 35, 
    name: "2022 Mercedes Benz AMG GT43", 
    category: "Mercedes", 
    price: 595, 
    hp: 362, 
    speed: "155 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-29K4mq/0/L/AMG-GT43-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=29K4mq&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 36, 
    name: "Mercedes Benz AMG GLS63", 
    category: "Mercedes", 
    price: 795, 
    hp: 603, 
    speed: "155 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-B7GV8R/0/L/GLS63-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=B7GV8R&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 37, 
    name: "Mercedes Benz C300", 
    category: "Mercedes", 
    price: 295, 
    hp: 255, 
    speed: "130 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-wfngxL/0/L/C300-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=wfngxL&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 38, 
    name: "2024 BMW M330i", 
    category: "BMW", 
    price: 395, 
    hp: 255, 
    speed: "155 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-wgkFvz/0/L/BMW330-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=wgkFvz&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 39, 
    name: "Audi a7 Fully Loaded", 
    category: "Audi", 
    price: 495, 
    hp: 335, 
    speed: "155 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-DVjswC/0/L/AudiA7-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=DVjswC&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 40, 
    name: "Genesis G70", 
    category: "Genesis", 
    price: 350, 
    hp: 252, 
    speed: "145 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-v8Xs8M/0/L/G70-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=v8Xs8M&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 41, 
    name: "Tesla Model 3", 
    category: "Tesla", 
    price: 195, 
    hp: 283, 
    speed: "140 MPH", 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-7HCrm5/0/L/Tesla3-L.jpg",
    requiresInsurance: false,
    slideshowUrl: "https://saucyrentals.smugmug.com/frame/slideshow?key=7HCrm5&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=38GRVK&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=KJdbk2&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=qrgxZ7&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=7vbk6x&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=zk2nSn&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=5RBDS9&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=B9pz2D&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=JpPrZs&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=KfcqhV&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=kbN7N5&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=NVXFjs&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=2pXFr5&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=ZhdhXm&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=kTtrkd&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=StRbS4&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=4qvJMX&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=JXvB3D&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=6fRtcC&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=5brpZh&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=d9jWgh&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 121, 
    name: "Maybach GLS600", 
    category: "Mercedes", 
    price: 1195, 
    hp: 550, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-HbsdfS/0/L/GLS600-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=HbsdfS&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 122, 
    name: "Maybach s580", 
    category: "Mercedes", 
    price: 995, 
    hp: 496, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-786XW2/0/L/S580-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=786XW2&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 123, 
    name: "Maybach s680 v12", 
    category: "Mercedes", 
    price: 1495, 
    hp: 621, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-f6szxj/0/L/S680-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=f6szxj&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
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
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=pg3f27&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 125, 
    name: "Custom RR cullinan Tiffany Blue", 
    category: "Rolls Royce", 
    price: 2995, 
    hp: 563, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-kgRNbg/0/L/TiffanyCullinan-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=kgRNbg&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 126, 
    name: "RR Dawn black badge", 
    category: "Rolls Royce", 
    price: 1895, 
    hp: 593, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-9WqBTK/0/L/RRDawn-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=9WqBTK&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 127, 
    name: "Widebody G63 AMG Custom", 
    category: "Mercedes", 
    price: 1695, 
    hp: 577, 
    speed: "149 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-nXpxSn/0/L/WidebodyG63-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=nXpxSn&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 128, 
    name: "G63 AMG 'Whiteout'", 
    category: "Mercedes", 
    price: 1595, 
    hp: 577, 
    speed: "149 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-pWfdTS/0/L/G63Whiteout-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=pWfdTS&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 129, 
    name: "AMG G63 Two-Tone", 
    category: "Mercedes", 
    price: 1695, 
    hp: 577, 
    speed: "149 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-H29Fnr/0/L/G63TwoTone-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=H29Fnr&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 130, 
    name: "Huracan STO", 
    category: "Lamborghini", 
    price: 1695, 
    hp: 631, 
    speed: "193 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-fP7PHD/0/L/HuracanSTO-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=fP7PHD&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 131, 
    name: "C8 Z06", 
    category: "Corvette", 
    price: 995, 
    hp: 670, 
    speed: "189 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-4hndMv/0/L/C8Z06-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=4hndMv&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 132, 
    name: "Cadillac Escalade V", 
    category: "Cadillac", 
    price: 995, 
    hp: 682, 
    speed: "125 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/i-9nSnzk/0/L/EscaladeV-L.jpg",
    slideshowUrl: "https://legacyexotics.smugmug.com/frame/slideshow?key=9nSnzk&speed=1&transition=fade&autoStart=1&captions=0&navigation=1&playButton=0&randomize=0&transitionSpeed=1"
  },
  { 
    id: 133, 
    name: "BMW M340i", 
    category: "BMW", 
    price: 495, 
    hp: 382, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 134, 
    name: "Porsche 911 Cabriolet", 
    category: "Porsche", 
    price: 1095, 
    hp: 379, 
    speed: "182 MPH", 
    requiresInsurance: true, 
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800" 
  },
  { 
    id: 135, 
    name: "Rolls-Royce Mansory Wraith", 
    category: "Rolls Royce", 
    price: 1995, 
    hp: 624, 
    speed: "155 MPH", 
    requiresInsurance: true, 
    image: "https://photos.smugmug.com/Saucy-Rentals-Extras/i-pg3f27/0/L/Cullinan-L.jpg", // Placeholder until links provided
    description: "The world's most luxurious grand tourer, elevated by Mansory. Starlight headliner, suicide doors, and unmatched presence.",
  },
];

interface InventoryProps {
  onClose: () => void;
}

const Inventory: React.FC<InventoryProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Component for Car Card to avoid repetition
  const CarCard = ({ car, onClick }: { car: Car, onClick: () => void, key?: any }) => {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        onClick={onClick}
        className="group relative bg-white border border-black/5 hover:border-accent/20 transition-all overflow-hidden cursor-pointer h-full flex flex-col"
      >
        {/* Image / Slideshow */}
        <div className="aspect-square overflow-hidden relative bg-black/5">
          {car.slideshowUrl ? (
            <div className="absolute inset-0 w-full h-full transition-all duration-700">
              <iframe 
                src={car.slideshowUrl.replace('autoStart=1', 'autoStart=0')} 
                width="100%" 
                height="100%" 
                frameBorder="no" 
                scrolling="no"
                className="w-full h-full pointer-events-none"
                title={`${car.name} Slideshow`}
                loading="lazy"
              />
              {/* Overlay to ensure clicks register on the card, not the iframe */}
              <div className="absolute inset-0 z-10 cursor-pointer" />
            </div>
          ) : (
            <motion.img 
              layoutId={`car-image-${car.id}`}
              src={car.image} 
              alt={car.name} 
              className="w-full h-full object-cover transition-all duration-700 font-sans"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 border border-black/10 rounded-sm z-20 pointer-events-none">
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
  };
  
  // Booking States
  const [user, setUser] = useState<User | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookingError, setBookingError] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Auth Listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setUserName(session.user.user_metadata?.full_name || "");
        setUserEmail(session.user.email || "");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setUserName(session.user.user_metadata?.full_name || "");
        setUserEmail(session.user.email || "");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Reset booking form
  useEffect(() => {
    if (selectedCar) {
      setCurrentImageIndex(0);
      setStartDate("");
      setEndDate("");
      setPhone("");
      setBookingStatus('idle');
      setBookingError("");
      if (!user) {
        setUserName("");
        setUserEmail("");
      }
    } else {
      setCurrentImageIndex(0);
    }
  }, [selectedCar, user]);

  const handleBooking = async () => {
    if (!startDate || !phone || !userName || !userEmail) {
      setBookingError("Please fill in Name, Email, Phone, and a Date.");
      return;
    }

    setBookingStatus('loading');
    setBookingError("");

    try {
      // Insert into Supabase according to the user's exact schema
      const { error: supabaseError } = await supabase
        .from('bookings')
        .insert([{
          name: `${userName} - ${selectedCar?.name}`,
          email: userEmail,
          phone: phone,
          booking_date: startDate,
          booking_time: "10:00 AM" // Default pickup time
        }]);

      if (supabaseError) throw supabaseError;

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
                        <div 
                          className="aspect-video overflow-hidden border border-black/5 bg-black/5 relative group cursor-pointer"
                          onClick={() => setCurrentImageIndex(prev => prev === (selectedCar.gallery || [selectedCar.image]).length - 1 ? 0 : prev + 1)}
                        >
                          <AnimatePresence mode="wait">
                            <motion.img 
                              key={currentImageIndex}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              src={(selectedCar.gallery || [selectedCar.image])[currentImageIndex]} 
                              alt={selectedCar.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </AnimatePresence>

                          {/* Image Counter */}
                          {(selectedCar.gallery && selectedCar.gallery.length > 1) && (
                            <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 text-[10px] text-white font-bold uppercase tracking-widest rounded-full z-20">
                              {currentImageIndex + 1} / {selectedCar.gallery.length}
                            </div>
                          )}

                          {/* Carousel Navigation */}
                          {(selectedCar.gallery && selectedCar.gallery.length > 1) && (
                            <>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(prev => prev === 0 ? selectedCar.gallery!.length - 1 : prev - 1);
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all focus:outline-none pointer-events-auto z-20"
                              >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex(prev => prev === selectedCar.gallery!.length - 1 ? 0 : prev + 1);
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all focus:outline-none pointer-events-auto z-20"
                              >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                              </button>
                            </>
                          )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                          {(selectedCar.gallery || [selectedCar.image]).map((img, idx) => (
                            <div 
                              key={idx} 
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`aspect-video bg-black/5 overflow-hidden border cursor-pointer hover:border-accent/40 transition-all ${currentImageIndex === idx ? 'border-accent ring-2 ring-accent/20' : 'border-black/5'}`}
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
                          <div className="space-y-4">
                            <div>
                              <label className="block text-[8px] uppercase tracking-widest font-bold text-black/40 mb-2">Full Name</label>
                              <input 
                                type="text" 
                                placeholder="Your Name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="w-full bg-white border border-black/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] uppercase tracking-widest font-bold text-black/40 mb-2">Email Address</label>
                              <input 
                                type="email" 
                                placeholder="Email Address"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                className="w-full bg-white border border-black/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                            <div>
                              <label className="block text-[8px] uppercase tracking-widest font-bold text-black/40 mb-2">Phone Number</label>
                              <input 
                                type="tel" 
                                placeholder="786-000-0000"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-white border border-black/10 px-4 py-3 text-xs focus:outline-none focus:border-accent"
                              />
                            </div>
                          </div>

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

                          <button 
                            onClick={handleBooking}
                            disabled={bookingStatus === 'loading'}
                            className="w-full py-6 bg-accent text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent/90 transition-all shadow-xl shadow-accent/20 disabled:bg-black/20"
                          >
                            {bookingStatus === 'loading' ? 'Processing...' : 'Confirm Rental'}
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
