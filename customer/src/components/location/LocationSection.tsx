'use client';

import { storeInfo } from '@shared/config/store';

export default function LocationSection() {
    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6">Visit Us</h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Map */}
                    <div className="rounded-2xl overflow-hidden shadow-lg h-80">
                        <iframe
                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d${storeInfo.coordinates.lng}!3d${storeInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301c10069b74201%3A0x38f4ffe8b66732b5!2sColumns%20Coffee%20%2B%20Kitchen!5e0!3m2!1sen!2sph!4v1705430400000`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Columns Coffee + Kitchen Location"
                        />
                    </div>

                    {/* Store Info */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">{storeInfo.name}</h3>
                            <p className="text-[var(--text-muted)]">{storeInfo.fullAddress}</p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">Contact</h4>
                            <p className="text-[var(--text-muted)]">
                                <a href={`tel:${storeInfo.phoneRaw}`} className="hover:text-[var(--primary)]">
                                    {storeInfo.phone}
                                </a>
                            </p>
                            <p className="text-[var(--text-muted)]">
                                <a href={`mailto:${storeInfo.email}`} className="hover:text-[var(--primary)]">
                                    {storeInfo.email}
                                </a>
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">Hours</h4>
                            <div className="space-y-1 text-sm text-[var(--text-muted)]">
                                {Object.entries(storeInfo.hours).map(([day, hours]) => (
                                    <div key={day} className="flex justify-between">
                                        <span className="capitalize">{day}</span>
                                        <span>{hours.open} - {hours.close}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${storeInfo.coordinates.lat},${storeInfo.coordinates.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary inline-flex"
                        >
                            Get Directions
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
