import React from 'react';

const features = [
    { icon: 'fas fa-search-location', title: 'Smart Search', description: 'Filter by location, gender, price, and amenities effortlessly.' },
    { icon: 'fas fa-shield-alt', title: 'Verified Listings', description: 'Only university-verified boardings are visible for peace of mind.' },
    { icon: 'fas fa-wallet', title: 'Secure Payments', description: 'Handle deposit and rent payments securely through the platform.' },
    { icon: 'fas fa-chart-line', title: 'Owner Dashboard', description: 'Manage bookings, payments, and view analytics easily.' },
];

const FeaturesSection = () => {
    return (
        <section id="features" className="py-16 bg-light md:py-12">
            <div className="max-w-[1200px] mx-auto p-6">
                <h2 className="text-3xl font-bold text-center text-primary mb-4">Why Choose SmartBoAD?</h2>
                <p className="text-center text-muted mb-8">Smarter tools for students, boarding owners, and university administrators.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature) => (
                        <div key={feature.title} className="bg-white p-6 rounded-xl text-center shadow-custom hover:-translate-y-1 transition-transform duration-300">
                            <i className={`${feature.icon} text-3xl text-secondary-accent mb-4`}></i>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;