'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Leaf } from 'lucide-react';
import Footer from '@/components/layout/Footer';

// Featured products - from real Columns Coffee + Kitchen menu
const featuredProducts = [
  { id: 'spanish-latte', name: 'Spanish Latte', price: 210, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', category: 'signature-coffee' },
  { id: 'bibimbap', name: 'Bibimbap', price: 350, image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400', category: 'rice-bowls' },
  { id: 'mango-mania', name: 'Mango Mania', price: 230, image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400', category: 'smoothies' },
  { id: 'beefless-burger', name: 'Beefless Burger', price: 270, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', category: 'burgers-wraps' },
  { id: 'matcha-latte', name: 'Matcha Latte', price: 210, image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400', category: 'matcha-hojicha' },
  { id: 'vanilla-pancake', name: 'Vanilla Pancake', price: 250, image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400', category: 'breakfast' },
];

// Top categories from real menu
const topCategories = [
  { id: 'coffee-classic', name: 'Specialty Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400' },
  { id: 'signature-coffee', name: 'Signature Coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400' },
  { id: 'smoothies', name: 'Smoothies', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400' },
  { id: 'breakfast', name: 'Breakfast', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400' },
  { id: 'burgers-wraps', name: 'Burgers & Wraps', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  { id: 'rice-bowls', name: 'Rice Bowls', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-4 border-white" />
          <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full border-4 border-white" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full border-2 border-white" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Plant-Based All The Way</span>
              <Leaf className="w-5 h-5" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Columns Coffee
              <span className="block text-2xl md:text-3xl font-normal mt-2 opacity-90">+ Kitchen</span>
            </h1>

            <p className="text-lg md:text-xl opacity-90 max-w-xl mx-auto mb-8">
              Crafted with 100% Arabica beans and fresh plant-based ingredients.
              Your neighborhood coffee destination in Butuan City.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white text-[var(--primary)] rounded-full font-semibold flex items-center gap-2 shadow-lg"
                >
                  View Menu
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=8.9411511,125.5360857"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/20 backdrop-blur rounded-full font-semibold flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </motion.button>
              </a>
            </div>
          </motion.div>

          {/* Store Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-8 left-0 right-0 flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Open Today: 7AM - 9PM</span>
              </div>
              <div className="w-px h-4 bg-white/30" />
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>2nd St. Guingona, Butuan</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Explore Our Menu</h2>
            <p className="text-[var(--text-muted)]">From specialty coffee to plant-based meals</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/menu?category=${category.id}`}>
                  <div className="group relative h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-semibold text-sm">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/menu">
              <button className="text-[var(--primary)] font-medium hover:underline flex items-center gap-2 mx-auto">
                View All Categories
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-[var(--background-alt)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Customer Favorites</h2>
            <p className="text-[var(--text-muted)]">Most loved items from our menu</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                  <p className="text-[var(--primary)] font-bold">₱{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary"
              >
                Order Now
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Plant-Based Banner */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 border border-green-100"
          >
            <div className="text-4xl mb-4">🌱</div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
              100% Plant-Based
            </h2>
            <p className="text-green-700 max-w-2xl mx-auto mb-6">
              Every item on our menu is crafted with plant-powered ingredients.
              From our vegan cold foam to our cashew-based cheese,
              we prove that delicious doesn&apos;t need dairy!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white px-4 py-2 rounded-full text-green-700 shadow-sm">
                🥛 Oat Milk Default
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-green-700 shadow-sm">
                🧀 Cashew Cheese
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-green-700 shadow-sm">
                🥚 No Eggs
              </span>
              <span className="bg-white px-4 py-2 rounded-full text-green-700 shadow-sm">
                ☕ 100% Arabica
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 bg-[var(--background-alt)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d125.5360857!3d8.9411511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301c10069b74201%3A0x38f4ffe8b66732b5!2sColumns%20Coffee%20%2B%20Kitchen!5e0!3m2!1sen!2sph!4v1705430400000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Columns Coffee + Kitchen Location"
              />
            </div>

            {/* Info */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Visit Us</h2>
              <p className="text-[var(--text-muted)] mb-6">
                Located in the heart of Butuan City, we&apos;re your go-to spot for
                specialty coffee and wholesome plant-based meals.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[var(--primary)] mt-1" />
                  <div>
                    <p className="font-medium">2nd Street Guingona</p>
                    <p className="text-[var(--text-muted)]">Butuan City, Agusan del Norte 8600</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--primary)] mt-1" />
                  <div>
                    <p className="font-medium">Open Daily</p>
                    <p className="text-[var(--text-muted)]">Mon-Thu: 7AM-9PM • Fri-Sat: 7AM-10PM • Sun: 8AM-9PM</p>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=8.9411511,125.5360857"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </motion.button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
