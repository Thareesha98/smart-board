import React from 'react';

const steps = [
    { icon: 'fas fa-user-plus', title: 'Register & Verify', description: 'Users sign up and owners/admins are verified by the university.' },
    { icon: 'fas fa-search', title: 'Browse & Select', description: 'Students search for verified boardings based on preferences.' },
    { icon: 'fas fa-handshake', title: 'Book & Secure', description: 'Confirm the booking and handle secure payments directly on the platform.' },
];

const ProcessSection = () => {
    return (
        <section id="process" className="py-16 bg-[#DED0B8] md:py-12">
            <div className="max-w-[1200px] mx-auto p-6">
                <h2 className="text-3xl font-bold text-center text-primary mb-4">How SmartBoAD Works</h2>
                <p className="text-center text-muted mb-8">A simple, transparent process for everyone involved.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <div key={step.title} className="bg-white p-6 rounded-xl text-center shadow-custom hover:-translate-y-1 transition-transform duration-300">
                            <i className={`${step.icon} text-3xl text-accent mb-4`}></i>
                            <h4 className="text-xl font-semibold text-text mb-2">{step.title}</h4>
                            <p className="text-muted">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;