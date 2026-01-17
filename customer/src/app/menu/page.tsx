'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Coffee, Leaf } from 'lucide-react';
import ProductCard from '@/components/menu/ProductCard';

// Real menu products from Columns Coffee + Kitchen (PHP prices)
const products = [
    // SPECIALTY COFFEE CLASSIC
    { id: 'espresso', name: 'Espresso', description: 'Single shot 100% Arabica', price: 100, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400', inStock: true },
    { id: 'americano', name: 'Americano', description: 'Espresso with hot water', price: 120, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400', inStock: true },
    { id: 'flat-white', name: 'Flat White', description: 'Espresso with steamed oat milk', price: 170, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=400', inStock: true },
    { id: 'cappuccino', name: 'Cappuccino', description: 'Espresso, oat milk, foam', price: 180, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400', inStock: true },
    { id: 'caffe-latte', name: 'Caffe Latte', description: 'Espresso with creamy oat milk', price: 190, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400', inStock: true },
    { id: 'cafe-mocha', name: 'Café Mocha', description: 'Espresso, chocolate, oat milk', price: 210, category: 'coffee-classic', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400', inStock: true },

    // SIGNATURE COFFEE
    { id: 'spanish-latte', name: 'Spanish Latte', description: 'Espresso, oat milk, oat condensed', price: 210, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400', inStock: true },
    { id: 'tiramisu-latte', name: 'Tiramisu Latte', description: 'Espresso, dark chocolate, cream', price: 230, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400', inStock: true },
    { id: 'caramel-seasalt-latte', name: 'Caramel Seasalt Latte', description: 'Sweet and salty layers', price: 230, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400', inStock: true },
    { id: 'cookie-butter-latte', name: 'Cookie Butter Latte', description: 'Cookies in a cup', price: 240, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', inStock: true },
    { id: 'breakfast-latte', name: 'Breakfast Latte', description: 'Topped with crunchy granola', price: 230, category: 'signature-coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', inStock: true },

    // NON-COFFEE
    { id: 'passion-fruit-tea', name: 'Passion Fruit Tea', description: 'Jasmine tea, passion fruit, chia', price: 190, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', inStock: true },
    { id: 'strawberry-oat', name: 'Strawberry Oat', description: 'Oatmilk, strawberry cold foam', price: 230, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400', inStock: true },
    { id: 'chocolate-oat', name: 'Chocolate Oat', description: 'Oatmilk, dark chocolate', price: 230, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', inStock: true },
    { id: 'butter-beer-latte', name: 'Butter Beer Latte', description: 'Ginger ale, popcorn syrup, cream', price: 250, category: 'non-coffee', image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', inStock: true },

    // MATCHA & HOJICHA
    { id: 'matcha-latte', name: 'Matcha Latte', description: 'Ceremonial Uji matcha, oat milk', price: 210, category: 'matcha-hojicha', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400', inStock: true },
    { id: 'strawberry-matcha', name: 'Strawberry Matcha', description: 'Green meets red berry heaven', price: 250, category: 'matcha-hojicha', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400', inStock: true },
    { id: 'hojicha-latte', name: 'Hojicha Latte', description: 'Roasted, charming hojicha', price: 210, category: 'matcha-hojicha', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400', inStock: true },

    // SMOOTHIES
    { id: 'mango-mania', name: 'Mango Mania', description: 'Mango, banana, plant-milk', price: 230, category: 'smoothies', image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400', inStock: true },
    { id: 'blue-planet', name: 'Blue Planet', description: 'Mango, blue spirulina, ginger', price: 250, category: 'smoothies', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400', inStock: true },
    { id: 'blueberry-bliss', name: 'Blueberry Bliss', description: 'Mango, banana, blueberries', price: 250, category: 'smoothies', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400', inStock: true },
    { id: 'pink-pitaya-berry', name: 'Pink Pitaya & Berry', description: 'Mango, strawberries, pink pitaya', price: 250, category: 'smoothies', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400', inStock: true },

    // SMOOTHIE BOWLS
    { id: 'berry-lovers-bowl', name: 'Berry Lovers Bowl', description: 'Mango, banana, berries, granola', price: 310, category: 'smoothie-bowls', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400', inStock: true },
    { id: 'green-glow-bowl', name: 'Green Glow Bowl', description: 'Spirulina, mango, wheatgrass', price: 310, category: 'smoothie-bowls', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400', inStock: true },

    // BREAKFAST
    { id: 'vanilla-pancake', name: 'Vanilla Pancake', description: 'Granola, banana, seasonal fruit', price: 250, category: 'breakfast', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400', inStock: true },
    { id: 'banana-waffle', name: 'Banana Waffle', description: 'Caramelised banana, granola', price: 260, category: 'breakfast', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400', inStock: true },
    { id: 'savory-waffle', name: 'Savory Waffle', description: "Fried chick'n, butter", price: 270, category: 'breakfast', image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400', inStock: true },
    { id: 'chia-pudding', name: 'Chia Pudding', description: 'Granola, blueberries, banana', price: 260, category: 'breakfast', image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=400', inStock: true },

    // PASTA & SANDWICHES
    { id: 'garlic-butter-pasta', name: 'Garlic Butter Pasta', description: 'Herbs, mushrooms, bread', price: 280, category: 'pasta-sandwiches', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', inStock: true },
    { id: 'spaghetti-arrabbiata', name: 'Spaghetti Arrabbiata', description: 'Garlic, chili, fresh tomatoes', price: 280, category: 'pasta-sandwiches', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', inStock: true },
    { id: 'ham-cheese-sandwich', name: 'Ham & Cheese', description: 'Sourdough, mozzarella', price: 270, category: 'pasta-sandwiches', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400', inStock: true },

    // BURGERS & WRAPS
    { id: 'beefless-burger', name: 'Beefless Burger', description: 'Plant patty, caramelised onion', price: 270, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', inStock: true },
    { id: 'crispy-chicken-burger', name: "Crispy Chick'n Burger", description: 'Fried chicken, mustard, slaw', price: 270, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', inStock: true },
    { id: 'spicy-falafel-wrap', name: 'Spicy Falafel Wrap', description: 'Falafel, hummus, pickles', price: 270, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', inStock: true },
    { id: 'bbq-jackfruit-wrap', name: 'BBQ Jackfruit Wrap', description: 'Pulled jackfruit, BBQ sauce', price: 260, category: 'burgers-wraps', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', inStock: true },

    // SALAD & GRAIN BOWLS
    { id: 'caesar-salad', name: 'Caesar Salad', description: 'Romaine, croutons, parmesan', price: 280, category: 'salad-bowls', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', inStock: true },
    { id: 'buddha-bowl', name: 'Buddha Bowl', description: 'Quinoa, roasted veggies, tahini', price: 320, category: 'salad-bowls', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', inStock: true },

    // FILO FAVES
    { id: 'sisig', name: 'Sisig', description: 'Classic Filipino sisig', price: 250, category: 'filo-faves', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400', inStock: true },
    { id: 'adobo-rice', name: 'Adobo Rice', description: 'Traditional adobo with rice', price: 230, category: 'filo-faves', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400', inStock: true },
    { id: 'kare-kare', name: 'Kare-Kare', description: 'Peanut stew, bagoong', price: 280, category: 'filo-faves', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400', inStock: true },

    // RICE & ADLAI BOWLS
    { id: 'bibimbap', name: 'Bibimbap', description: 'Korean rice bowl, gochujang', price: 350, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400', inStock: true },
    { id: 'teriyaki-bowl', name: 'Teriyaki Bowl', description: 'Glazed protein, pickled ginger', price: 340, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', inStock: true },
    { id: 'crispy-tofu-bowl', name: 'Crispy Tofu Bowl', description: 'Crispy tofu, veggies, sauce', price: 320, category: 'rice-bowls', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400', inStock: true },

    // TO SHARE
    { id: 'loaded-nachos', name: 'Loaded Nachos', description: 'Chips, cheese, salsa, guac', price: 320, category: 'to-share', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400', inStock: true },
    { id: 'buffalo-wings', name: 'Buffalo Wings', description: 'Crispy wings, buffalo sauce', price: 350, category: 'to-share', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400', inStock: true },

    // JUICES
    { id: 'green-detox', name: 'Green Detox', description: 'Spinach, apple, ginger, lemon', price: 250, category: 'juices', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400', inStock: true },
    { id: 'orange-carrot', name: 'Orange Carrot', description: 'Fresh orange, carrot, ginger', price: 250, category: 'juices', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400', inStock: true },
];

// Category tabs matching the Columns Coffee menu
const categoryTabs = [
    { id: 'all', name: 'All' },
    { id: 'coffee-classic', name: '☕ Coffee' },
    { id: 'signature-coffee', name: '✨ Signature' },
    { id: 'non-coffee', name: '🍵 Non-Coffee' },
    { id: 'matcha-hojicha', name: '🍃 Matcha' },
    { id: 'smoothies', name: '🥤 Smoothies' },
    { id: 'smoothie-bowls', name: '🥣 Bowls' },
    { id: 'breakfast', name: '🥞 Breakfast' },
    { id: 'pasta-sandwiches', name: '🍝 Pasta' },
    { id: 'burgers-wraps', name: '🍔 Burgers' },
    { id: 'salad-bowls', name: '🥗 Salads' },
    { id: 'filo-faves', name: '🇵🇭 Filo Faves' },
    { id: 'rice-bowls', name: '🍚 Rice Bowls' },
    { id: 'to-share', name: '🍟 To Share' },
    { id: 'juices', name: '🧃 Juices' },
];

function MenuContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';
    const initialSearch = searchParams.get('search') || '';

    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <>
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] py-8 px-4 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <Leaf className="w-5 h-5" />
                        <span className="text-sm font-medium uppercase tracking-wider opacity-90">Plant-Based All The Way</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Our Menu</h1>
                    <p className="text-white/80">Crafted with 100% Arabica and fresh plant-based ingredients</p>
                </div>
            </div>

            {/* Search & Categories */}
            <div className="bg-[var(--background-alt)] py-6 px-4 sticky top-0 z-20 border-b border-[var(--border)]">
                <div className="max-w-6xl mx-auto">
                    {/* Search */}
                    <div className="relative max-w-md mb-4">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search menu..."
                            className="input pl-12"
                        />
                    </div>

                    {/* Category Tabs - Scrollable */}
                    <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
                        {categoryTabs.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === category.id
                                        ? 'bg-[var(--primary)] text-white'
                                        : 'bg-white border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)]'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Category Title */}
                    {activeCategory !== 'all' && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">
                                {categoryTabs.find(c => c.id === activeCategory)?.name}
                            </h2>
                            <p className="text-[var(--text-muted)] text-sm">
                                {filteredProducts.length} items
                            </p>
                        </div>
                    )}

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <Coffee className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" />
                            <p className="text-[var(--text-muted)]">No products found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} {...product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function MenuLoading() {
    return (
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
            <div className="text-[var(--text-muted)]">Loading menu...</div>
        </div>
    );
}

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-[var(--background)]">
            <Suspense fallback={<MenuLoading />}>
                <MenuContent />
            </Suspense>
        </div>
    );
}
