// Real store information for Columns Coffee + Kitchen
export const storeInfo = {
    name: 'Columns Coffee + Kitchen',
    shortName: 'Columns Coffee',
    tagline: 'Your neighborhood coffee destination',

    // Location
    address: '2nd Street Guingona',
    city: 'Butuan City',
    province: 'Agusan del Norte',
    country: 'Philippines',
    postalCode: '8600',
    fullAddress: '2nd Street Guingona, Butuan City, Agusan del Norte 8600, Philippines',

    // Coordinates (from Google Maps)
    coordinates: {
        lat: 8.9411511,
        lng: 125.5360857,
    },

    // Google Maps
    googleMapsUrl: 'https://maps.app.goo.gl/columns-coffee-butuan',
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d823!2d125.5360373!3d8.9412804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301c10069b74201%3A0x38f4ffe8b66732b5!2sColumns%20Coffee%20%2B%20Kitchen!5e0!3m2!1sen!2sph!4v1234567890',

    // Contact
    phone: '+63 995 648 7004',
    phoneRaw: '09956487004',
    email: 'hello@columnscoffee.ph',

    // Social Media
    social: {
        facebook: 'https://facebook.com/columnscoffeekitchen',
        instagram: 'https://instagram.com/columnscoffee',
    },

    // Operating Hours
    hours: {
        monday: { open: '7:00 AM', close: '9:00 PM' },
        tuesday: { open: '7:00 AM', close: '9:00 PM' },
        wednesday: { open: '7:00 AM', close: '9:00 PM' },
        thursday: { open: '7:00 AM', close: '9:00 PM' },
        friday: { open: '7:00 AM', close: '10:00 PM' },
        saturday: { open: '7:00 AM', close: '10:00 PM' },
        sunday: { open: '8:00 AM', close: '9:00 PM' },
    },

    // Business Info
    currency: 'PHP',
    currencySymbol: '₱',
    taxRate: 12, // VAT

    // Receipt
    receiptHeader: 'Thank you for visiting Columns Coffee + Kitchen!',
    receiptFooter: 'See you again soon! ☕',
    tinNumber: '000-000-000-000',
};

export const formatPrice = (price: number): string => {
    return `₱${price.toFixed(2)}`;
};

export const formatPhone = (phone: string): string => {
    // Format: +63 XXX XXX XXXX
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('63')) {
        return `+63 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
    }
    if (cleaned.startsWith('0')) {
        return `+63 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    return phone;
};
