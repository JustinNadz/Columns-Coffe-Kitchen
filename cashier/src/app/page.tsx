'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coffee,
  LayoutGrid,
  ClipboardList,
  Settings,
  LogOut,
  Search,
  X,
  MapPin,
  Minus,
  Plus,
  StickyNote,
  Percent,
  Trash2,
  ChevronRight,
  Keyboard,
  Package,
  ChevronLeft
} from 'lucide-react';
import { usePOSStore } from '@/store/posStore';
import DiscountModal from '@/components/pos/DiscountModal';
import NotesModal from '@/components/pos/NotesModal';
import ReceiptModal from '@/components/pos/ReceiptModal';

// Complete menu products from Columns Coffee + Kitchen (PHP prices) - matches customer app
const products = [
  // ============ SPECIALTY COFFEE CLASSIC ============
  { id: 'espresso', name: 'Espresso', description: 'Single shot 100% Arabica', price: 100, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300', inStock: true },
  { id: 'americano', name: 'Americano', description: 'Espresso with hot water', price: 120, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=300', inStock: true },
  { id: 'flat-white', name: 'Flat White', description: 'Espresso with steamed oat milk', price: 170, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=300', inStock: true },
  { id: 'cappuccino', name: 'Cappuccino', description: 'Espresso, oat milk, foam', price: 180, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300', inStock: true },
  { id: 'caffe-latte', name: 'Caffe Latte', description: 'Espresso with creamy oat milk', price: 190, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=300', inStock: true },
  { id: 'cafe-mocha', name: 'Café Mocha', description: 'Espresso, chocolate, oat milk', price: 210, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=300', inStock: true },

  // ============ SIGNATURE COFFEE ============
  { id: 'spanish-latte', name: 'Spanish Latte', description: 'Espresso, oat milk, oat condensed', price: 210, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300', inStock: true },
  { id: 'spiced-mocha', name: 'Spiced Mocha', description: 'Rich mocha with cinnamon', price: 220, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=300', inStock: true },
  { id: 'tiramisu-latte', name: 'Tiramisu Latte', description: 'Espresso, dark chocolate, cream, cocoa', price: 230, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=300', inStock: true },
  { id: 'breakfast-latte', name: 'Breakfast Latte', description: 'Topped with crunchy granola (iced)', price: 230, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', inStock: true },
  { id: 'caramel-seasalt-latte', name: 'Caramel Seasalt', description: 'Sweet and salty layers (iced)', price: 230, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=300', inStock: true },
  { id: 'cookie-butter-latte', name: 'Cookie Butter', description: 'Cookies in a cup (iced)', price: 240, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300', inStock: true },
  { id: 'signature-cream-latte', name: 'Signature Cream', description: 'Signature caramel with a twist', price: 240, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300', inStock: true },
  { id: 'spanish-cold-brew', name: 'Spanish Cold Brew', description: 'Frozen cold brew, oat condensed', price: 250, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300', inStock: true },
  { id: 'mocha-cold-brew', name: 'Mocha Cold Brew', description: 'Frozen cold brew with rich cocoa', price: 250, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300', inStock: true },

  // ============ NON-COFFEE ============
  { id: 'passion-fruit-tea', name: 'Passion Fruit Tea', description: 'Jasmine tea, passion fruit, chia', price: 190, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300', inStock: true },
  { id: 'strawberry-fruit-tea', name: 'Strawberry Fruit Tea', description: 'Jasmine tea, strawberry, chia', price: 200, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300', inStock: true },
  { id: 'lychee-fruit-tea', name: 'Lychee Fruit Tea', description: 'Jasmine tea, lychee, chia', price: 210, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300', inStock: true },
  { id: 'strawberry-oat', name: 'Strawberry Oat', description: 'Oatmilk, strawberry cold foam', price: 230, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300', inStock: true },
  { id: 'chocolate-oat', name: 'Chocolate Oat', description: 'Oatmilk, dark chocolate, cold foam', price: 230, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300', inStock: true },
  { id: 'butter-beer-latte', name: 'Butter Beer Latte', description: 'Ginger ale, popcorn syrup, cream', price: 250, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300', inStock: true },
  { id: 'teas', name: 'Teas', description: 'Selection of loose leaf teas', price: 180, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300', inStock: true },

  // ============ MATCHA & HOJICHA ============
  { id: 'matcha-latte', name: 'Matcha Latte', description: 'Ceremonial Uji matcha, oat milk', price: 210, category: 'matcha-hojicha', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300', inStock: true },
  { id: 'matcha-biscoff', name: 'Matcha Biscoff Pudding', description: 'Uji matcha with Biscoff crunch', price: 250, category: 'matcha-hojicha', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300', inStock: true },
  { id: 'strawberry-matcha', name: 'Strawberry Matcha', description: 'Green meets red berry heaven', price: 250, category: 'matcha-hojicha', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300', inStock: true },
  { id: 'hojicha-latte', name: 'Hojicha Latte', description: 'Roasted, charming hojicha', price: 210, category: 'matcha-hojicha', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=300', inStock: true },

  // ============ HERBAL LATTES ============
  { id: 'golden-milk', name: 'Golden Milk', description: 'Turmeric, cinnamon, black pepper', price: 200, category: 'herbal-lattes', image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300', inStock: true },
  { id: 'unicorn-latte', name: 'Unicorn Latte', description: 'Pink pitaya, cinnamon, oat condensed', price: 200, category: 'herbal-lattes', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300', inStock: true },
  { id: 'blue-butterfly', name: 'Blue Butterfly', description: 'Blue ternate tea, turmeric, oat', price: 200, category: 'herbal-lattes', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300', inStock: true },

  // ============ SMOOTHIES ============
  { id: 'mango-mania', name: 'Mango Mania', description: 'Mango, banana, plant-milk', price: 230, category: 'smoothies', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300', inStock: true },
  { id: 'blue-planet', name: 'Blue Planet', description: 'Mango, blue spirulina, ginger', price: 250, category: 'smoothies', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300', inStock: true },
  { id: 'blueberry-bliss', name: 'Blueberry Bliss', description: 'Mango, banana, blueberries', price: 250, category: 'smoothies', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300', inStock: true },
  { id: 'pink-pitaya-berry', name: 'Pink Pitaya Berry', description: 'Mango, strawberries, pink pitaya', price: 250, category: 'smoothies', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=300', inStock: true },

  // ============ SMOOTHIE BOWLS ============
  { id: 'berry-lovers-bowl', name: 'Berry Lovers Bowl', description: 'Pitaya, berries, granola, chia', price: 310, category: 'smoothie-bowls', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300', inStock: true },
  { id: 'green-glow-bowl', name: 'Green Glow Bowl', description: 'Spirulina, wheatgrass, granola', price: 310, category: 'smoothie-bowls', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300', inStock: true },
  { id: 'mango-tango-bowl', name: 'Mango Tango Bowl', description: 'Mango, goji, coco flakes, walnuts', price: 310, category: 'smoothie-bowls', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300', inStock: true },

  // ============ ALL-DAY BREAKFAST ============
  { id: 'vanilla-pancake', name: 'Vanilla Pancake', description: 'Granola, banana, seasonal fruit', price: 250, category: 'breakfast', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=300', inStock: true },
  { id: 'banana-waffle', name: 'Banana Waffle', description: 'Caramelised banana, granola', price: 260, category: 'breakfast', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300', inStock: true },
  { id: 'savory-waffle', name: 'Savory Waffle', description: "Fried chick'n, butter", price: 270, category: 'breakfast', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300', inStock: true },
  { id: 'banana-biscoff-waffle', name: 'Banana Biscoff Waffle', description: 'Banana, biscoff sauce, cream', price: 280, category: 'breakfast', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300', inStock: true },
  { id: 'chia-pudding', name: 'Chia Pudding', description: 'Granola, blueberries, banana', price: 260, category: 'breakfast', image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=300', inStock: true },
  { id: 'overnight-oats', name: 'Overnight Oats', description: 'Rolled oats, cocoa, mango, banana', price: 260, category: 'breakfast', image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=300', inStock: true },

  // ============ PASTA & SANDWICHES ============
  { id: 'garlic-butter-pasta', name: 'Garlic Butter Pasta', description: 'Herbs, mushrooms, artisan bread', price: 280, category: 'pasta-sandwiches', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300', inStock: true },
  { id: 'spaghetti-arrabbiata', name: 'Spaghetti Arrabbiata', description: 'Chili, olives, fresh tomatoes', price: 280, category: 'pasta-sandwiches', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300', inStock: true },
  { id: 'creamy-tuna-sandwich', name: 'Creamy Tuna Sandwich', description: 'Sourdough, tuna spread, mayo', price: 260, category: 'pasta-sandwiches', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300', inStock: true },
  { id: 'ham-cheese-sandwich', name: 'Ham & Cheese', description: 'Sourdough, ham, mozzarella', price: 270, category: 'pasta-sandwiches', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300', inStock: true },
  { id: 'philly-cheesesteak', name: 'Philly Cheesesteak', description: 'Beef, capsicum, mozzarella', price: 280, category: 'pasta-sandwiches', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=300', inStock: true },

  // ============ BURGERS & WRAPS ============
  { id: 'beefless-burger', name: 'Beefless Burger', description: 'Plant patty, caramelised onion', price: 270, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300', inStock: true },
  { id: 'cheese-burger', name: 'Cheese Burger', description: 'Beefless patty, queso, mustard', price: 280, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300', inStock: true },
  { id: 'hawaiian-burger', name: 'Hawaiian Burger', description: 'Beefless patty, pineapple, queso', price: 290, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?w=300', inStock: true },
  { id: 'tempeh-burger', name: 'Tempeh Burger', description: 'Tempeh, queso, mustard, greens', price: 270, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=300', inStock: true },
  { id: 'tofu-teriyaki-wrap', name: 'Tofu Teriyaki Wrap', description: 'Tofu, teriyaki, ranch dressing', price: 230, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300', inStock: true },
  { id: 'cheesy-beef-wrap', name: 'Cheesy Beef Wrap', description: 'Beefless slices, cashew queso', price: 290, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=300', inStock: true },
  { id: 'rainbow-tempeh-wrap', name: 'Rainbow Tempeh Wrap', description: 'Tempeh, veggies, garlic cashew', price: 260, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', inStock: true },
  { id: 'sisig-wrap', name: 'Sisig Wrap', description: 'Sisig, queso, chipotle sauce', price: 290, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1594834749740-74b3f6764be4?w=300', inStock: true },
  { id: 'spicy-falafel-wrap', name: 'Falafel Wrap', description: 'Falafel, hummus, pickles', price: 270, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300', inStock: true },

  // ============ SALAD & GRAIN BOWLS ============
  { id: 'tofu-quinoa-bowl', name: 'Tofu Quinoa Bowl', description: 'Tofu, quinoa, tempeh, tahini', price: 380, category: 'salad-bowls', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300', inStock: true },
  { id: 'japchae-sesame', name: 'Japchae Sesame', description: 'Korean glass noodle, tempeh', price: 370, category: 'salad-bowls', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300', inStock: true },
  { id: 'chicken-sriracha-quinoa', name: 'Chicken Sriracha Quinoa', description: 'Quinoa, chicken, chickpeas', price: 390, category: 'salad-bowls', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', inStock: true },
  { id: 'harvest-grain-salad', name: 'Harvest Grain Salad', description: 'Quinoa, tempeh, mushroom', price: 380, category: 'salad-bowls', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300', inStock: true },
  { id: 'chiangmai-cashew', name: 'Chiangmai Cashew', description: 'Tempeh, mango, peanut sauce', price: 370, category: 'salad-bowls', image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300', inStock: true },

  // ============ FILO FAVES ============
  { id: 'bbq-rice', name: 'BBQ Rice', description: 'Brown rice, BBQ skewers, papaya', price: 250, category: 'filo-faves', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300', inStock: true },
  { id: 'fried-chickn', name: "Fried Chick'n", description: 'Brown rice, fried chicken, cucumber', price: 250, category: 'filo-faves', image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=300', inStock: true },
  { id: 'sisig-rice', name: 'Sisig Rice', description: 'Brown rice, sisig, mayo, calamansi', price: 250, category: 'filo-faves', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300', inStock: true },
  { id: 'tosilog', name: 'Tosilog', description: 'Brown rice, tofu, tocino, cucumber', price: 230, category: 'filo-faves', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300', inStock: true },
  { id: 'tapsilog', name: 'Tapsilog', description: 'Brown rice, tofu, tapa, cucumber', price: 250, category: 'filo-faves', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300', inStock: true },
  { id: 'spamsilog', name: 'Spamsilog', description: 'Brown rice, tofu, luncheon meat', price: 230, category: 'filo-faves', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300', inStock: true },

  // ============ RICE & ADLAI BOWLS ============
  { id: 'bibimbap', name: 'Bibimbap', description: 'Korean rice bowl, gochujang', price: 350, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300', inStock: true },
  { id: 'sticky-soy-rice-bowl', name: 'Sticky Soy Rice Bowl', description: 'Teriyaki tofu, sesame, corn', price: 320, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300', inStock: true },
  { id: 'asian-teriyaki', name: 'Asian Teriyaki', description: 'Tofu, teriyaki, nori, kimchi', price: 370, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300', inStock: true },
  { id: 'tempeh-adlai-bowl', name: 'Tempeh Adlai Bowl', description: 'Adlai, tofu, tempeh, sweet potato', price: 390, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300', inStock: true },
  { id: 'deconstructed-adlai-musubi', name: 'Adlai Musubi', description: 'Adlai, ham, seaweed, teriyaki', price: 310, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=300', inStock: true },
  { id: 'shawarma-rice-bowl', name: 'Shawarma Rice Bowl', description: 'Beef, salsa, chickpeas, garlic', price: 390, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=300', inStock: true },
  { id: 'teriyaki-bowl', name: 'Teriyaki Bowl', description: 'Glazed protein, pickled ginger', price: 340, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300', inStock: true },
  { id: 'crispy-tofu-bowl', name: 'Crispy Tofu Bowl', description: 'Crispy tofu, veggies, sauce', price: 320, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300', inStock: true },

  // ============ TO SHARE ============
  { id: 'sticky-soy', name: 'Sticky Soy', description: 'Teriyaki tofu, corn, sesame', price: 230, category: 'to-share', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300', inStock: true },
  { id: 'queso-chili-quesadilla-half', name: 'Quesadilla (Half)', description: 'Tortilla, corn, cashew cheese', price: 210, category: 'to-share', image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300', inStock: true },
  { id: 'queso-chili-quesadilla-full', name: 'Quesadilla (Full)', description: 'Tortilla, corn, cashew cheese', price: 380, category: 'to-share', image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=300', inStock: true },
  { id: 'artichoke-bruschetta', name: 'Artichoke Bruschetta', description: 'Artisan bread, artichoke, olives', price: 260, category: 'to-share', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300', inStock: true },
  { id: 'potato-fries', name: 'Potato Fries', description: 'Deep-fried potatoes, garlic, pepper', price: 230, category: 'to-share', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300', inStock: true },
  { id: 'queso-nachos', name: 'Queso Nachos', description: 'Corn chips, cashew queso, jalapeño', price: 290, category: 'to-share', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=300', inStock: true },
  { id: 'nori-chips', name: 'Nori Chips', description: 'Nori, rice wraps, gochujang mayo', price: 230, category: 'to-share', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300', inStock: true },

  // ============ FRESH-PRESSED JUICES ============
  { id: 'red-beauty', name: 'Red Beauty Juice', description: 'Ginger, beetroot, pineapple, chia', price: 250, category: 'juices', image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=300', inStock: true },
  { id: 'green-detox', name: 'Green Detox Juice', description: 'Pechay, pineapple, chia', price: 250, category: 'juices', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300', inStock: true },
  { id: 'tropical-cleanse', name: 'Tropical Cleanse', description: 'Mango, carrot, pineapple, chia', price: 250, category: 'juices', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300', inStock: true },

  // ============ EXTRAS ============
  { id: 'extra-tempeh', name: 'Extra Tempeh', description: 'Add-on tempeh for any dish', price: 80, category: 'extras', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300', inStock: true },
  { id: 'adlai-quinoa-replacement', name: 'Adlai/Quinoa Upgrade', description: 'Upgrade your rice', price: 50, category: 'extras', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300', inStock: true },
  { id: 'kimchi-bottle', name: 'Kimchi Bottle', description: 'Homemade kimchi to take home', price: 250, category: 'extras', image: 'https://images.unsplash.com/photo-1583224994076-0820e08a68cb?w=300', inStock: true },
];



// POS categories with keyboard shortcuts
const categories = [
  { id: 'coffee-classic', name: 'Coffee Classic', key: '1' },
  { id: 'signature-coffee', name: 'Signature', key: '2' },
  { id: 'non-coffee', name: 'Non-Coffee', key: '3' },
  { id: 'matcha-hojicha', name: 'Matcha', key: '4' },
  { id: 'herbal-lattes', name: 'Herbal', key: '5' },
  { id: 'smoothies', name: 'Smoothies', key: '6' },
  { id: 'smoothie-bowls', name: 'Bowls', key: '7' },
  { id: 'breakfast', name: 'Breakfast', key: '8' },
  { id: 'pasta-sandwiches', name: 'Pasta', key: '9' },
  { id: 'burgers-wraps', name: 'Burgers', key: '0' },
  { id: 'salad-bowls', name: 'Salads' },
  { id: 'filo-faves', name: 'Filo Faves' },
  { id: 'rice-bowls', name: 'Rice Bowls' },
  { id: 'to-share', name: 'To Share' },
  { id: 'juices', name: 'Juices' },
  { id: 'extras', name: 'Extras' },
];

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState('coffee-classic');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedItemForNotes, setSelectedItemForNotes] = useState<string | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const {
    orderNumber,
    orderType,
    items,
    discount,
    setOrderType,
    addItem,
    updateQuantity,
    updateNotes,
    setDiscount,
    clearOrder,
    getSubtotal,
    getTax,
    getTotal,
  } = usePOSStore();

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    // Number keys for categories
    if (e.key >= '1' && e.key <= '9') {
      const cat = categories[parseInt(e.key) - 1];
      if (cat) setActiveCategory(cat.id);
    }
    if (e.key === '0') {
      const cat = categories[9];
      if (cat) setActiveCategory(cat.id);
    }

    // Escape to clear
    if (e.key === 'Escape') {
      if (showDiscountModal || showNotesModal || showReceiptModal) return;
      clearOrder();
    }

    // Enter to checkout
    if (e.key === 'Enter' && items.length > 0) {
      if (showDiscountModal || showNotesModal || showReceiptModal) return;
      setShowReceiptModal(true);
    }

    // D for discount
    if (e.key === 'd' || e.key === 'D') {
      if (items.length > 0) setShowDiscountModal(true);
    }

    // ? for shortcuts
    if (e.key === '?') {
      setShowShortcuts(prev => !prev);
    }
  }, [items, clearOrder, showDiscountModal, showNotesModal, showReceiptModal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory = p.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const handleApplyDiscount = (amount: number, type: 'percentage' | 'fixed') => {
    const discountAmount = type === 'percentage'
      ? (getSubtotal() * amount) / 100
      : amount;
    setDiscount(discountAmount);
  };

  const handleCheckout = () => {
    setShowReceiptModal(true);
  };

  const getItemForNotes = () => {
    return items.find(i => i.productId === selectedItemForNotes);
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-scroll');
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex h-screen bg-[var(--background-alt)]">
      {/* Sidebar */}
      <aside className="w-16 bg-[var(--background-sidebar)] flex flex-col items-center py-4">
        <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center mb-8">
          <Coffee className="w-5 h-5 text-white" />
        </div>

        <nav className="flex-1 flex flex-col items-center gap-2">
          <button className="w-10 h-10 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center">
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-400 hover:bg-white/10 flex items-center justify-center">
            <ClipboardList className="w-5 h-5" />
          </button>
        </nav>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => setShowShortcuts(true)}
            className="w-10 h-10 rounded-lg text-gray-400 hover:bg-white/10 flex items-center justify-center"
            title="Keyboard Shortcuts (?)"
          >
            <Keyboard className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-400 hover:bg-white/10 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-400 hover:bg-white/10 flex items-center justify-center">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Columns Coffee + Kitchen</h1>
            <p className="text-xs text-[var(--text-muted)]">🌱 Plant-Based All The Way!</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search menu items...'
                className="input pl-9 pr-4 w-80 text-sm"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-2 hover:bg-[var(--background-alt)] rounded-lg"
              >
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            )}
          </div>
        </header>

        {/* Category Tabs with Scroll */}
        <div className="bg-white border-b border-[var(--border)] px-6 py-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCategories('left')}
              className="p-1 hover:bg-[var(--background-alt)] rounded"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div
              id="category-scroll"
              className="flex gap-2 overflow-x-auto scrollbar-hide flex-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === cat.id
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-[var(--background-alt)] text-[var(--text-primary)] hover:bg-[var(--border)]'
                    }`}
                >
                  {cat.name}
                  <span className="ml-1 text-[10px] opacity-60">{cat.key}</span>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => scrollCategories('right')}
              className="p-1 hover:bg-[var(--background-alt)] rounded"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.button
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => product.inStock && addItem({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  })}
                  disabled={!product.inStock}
                  whileHover={{ scale: product.inStock ? 1.02 : 1 }}
                  whileTap={{ scale: product.inStock ? 0.98 : 1 }}
                  className={`card p-3 text-left transition-all ${!product.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
                    }`}
                >
                  <div className="relative mb-3">
                    <div
                      className="w-full aspect-square rounded-xl bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${product.image})`,
                        backgroundColor: '#F0EBE5'
                      }}
                    />
                    <span className="absolute top-2 right-2 badge badge-primary">
                      ₱{product.price}
                    </span>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                        <span className="bg-white text-xs font-medium px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-xs text-[var(--text-muted)] truncate">{product.description}</p>
                </motion.button>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12 text-[var(--text-muted)]">
                <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No items in this category</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Order Panel */}
      <aside className="w-96 bg-white border-l border-[var(--border)] flex flex-col">
        {/* Order Header */}
        <div className="p-4 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Order #{orderNumber}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOrderType('dine-in')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${orderType === 'dine-in'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--background-alt)] text-[var(--text-secondary)]'
                  }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                Dine-in
              </button>
              <button
                onClick={() => setOrderType('takeout')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${orderType === 'takeout'
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--background-alt)] text-[var(--text-secondary)]'
                  }`}
              >
                <Package className="w-3.5 h-3.5" />
                Takeout
              </button>
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Cashier • {currentTime}</p>
        </div>

        {/* Order Items */}
        <div className="flex-1 overflow-auto p-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-[var(--background-alt)] rounded-full flex items-center justify-center mb-3">
                <Package className="w-8 h-8 text-[var(--text-muted)]" />
              </div>
              <p className="text-[var(--text-muted)] text-sm mb-1">No items added yet</p>
              <p className="text-[var(--text-muted)] text-xs">Click products to add them</p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3"
                  >
                    <div
                      className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundColor: '#F0EBE5'
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <span className="font-medium text-sm">₱{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                      {item.addons && item.addons.length > 0 && (
                        <p className="text-xs text-[var(--primary)]">
                          + {item.addons.map(a => a.name).join(', ')}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-xs text-[var(--text-muted)]">📝 {item.notes}</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-6 h-6 rounded border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--background-alt)]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-6 h-6 rounded border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--background-alt)]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItemForNotes(item.productId);
                            setShowNotesModal(true);
                          }}
                          className="ml-auto p-1 text-[var(--text-muted)] hover:text-[var(--primary)]"
                          title="Add notes"
                        >
                          <StickyNote className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-[var(--border)]">
          <div className="flex gap-2 mb-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => items.length > 0 && setShowNotesModal(true)}
              disabled={items.length === 0}
              className="flex-1 btn btn-outline text-xs py-2.5 disabled:opacity-50"
            >
              <StickyNote className="w-4 h-4" />
              Note
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDiscountModal(true)}
              disabled={items.length === 0}
              className="flex-1 btn btn-outline text-xs py-2.5 disabled:opacity-50"
            >
              <Percent className="w-4 h-4" />
              Discount
              {discount > 0 && <span className="ml-1 text-[var(--primary)]">✓</span>}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearOrder}
              disabled={items.length === 0}
              className="flex-1 btn btn-outline text-xs py-2.5 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </motion.button>
          </div>

          {/* Totals */}
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-[var(--text-muted)]">
              <span>Subtotal</span>
              <span>₱{getSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[var(--text-muted)]">
              <span>VAT (12%)</span>
              <span>₱{getTax().toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between text-[var(--primary)]"
              >
                <span>Discount</span>
                <span>-₱{discount.toLocaleString()}</span>
              </motion.div>
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">Total</span>
            <motion.span
              key={getTotal()}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold"
            >
              ₱{getTotal().toLocaleString()}
            </motion.span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full btn btn-primary py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Checkout
            <ChevronRight className="w-5 h-5" />
            <span className="ml-2 text-xs opacity-60">↵</span>
          </motion.button>
        </div>
      </aside>

      {/* Modals */}
      <DiscountModal
        isOpen={showDiscountModal}
        onClose={() => setShowDiscountModal(false)}
        onApply={handleApplyDiscount}
        subtotal={getSubtotal()}
      />

      <NotesModal
        isOpen={showNotesModal}
        onClose={() => {
          setShowNotesModal(false);
          setSelectedItemForNotes(null);
        }}
        onSave={(notes) => {
          if (selectedItemForNotes) {
            updateNotes(selectedItemForNotes, notes);
          }
        }}
        itemName={getItemForNotes()?.name || 'Order'}
        initialNotes={getItemForNotes()?.notes || ''}
      />

      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => {
          setShowReceiptModal(false);
          clearOrder();
        }}
        order={{
          orderNumber,
          items: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price, notes: i.notes })),
          subtotal: getSubtotal(),
          tax: getTax(),
          discount,
          total: getTotal(),
          type: orderType,
          cashierName: 'Cashier',
        }}
      />

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShortcuts(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 z-50 w-80"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Keyboard className="w-5 h-5" />
                Keyboard Shortcuts
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Categories</span>
                  <kbd className="px-2 py-1 bg-[var(--background-alt)] rounded text-xs">1-0</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Checkout</span>
                  <kbd className="px-2 py-1 bg-[var(--background-alt)] rounded text-xs">Enter</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Clear Order</span>
                  <kbd className="px-2 py-1 bg-[var(--background-alt)] rounded text-xs">Esc</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Discount</span>
                  <kbd className="px-2 py-1 bg-[var(--background-alt)] rounded text-xs">D</kbd>
                </div>
              </div>
              <button
                onClick={() => setShowShortcuts(false)}
                className="w-full btn btn-primary mt-4"
              >
                Got it!
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
