import React from 'react';

const ContactBanner = () => {
    return (
        <section id="contact" className="py-16 bg-[#DED0B8] md:py-12">
            <div className="max-w-[1200px] mx-auto p-6 bg-white rounded-xl shadow-custom flex justify-between items-center flex-wrap md:flex-col md:text-center">
                <div>
                    <h3 className="text-2xl font-bold text-primary">Contact the SmartBoAD Team</h3>
                    <p className="text-muted">Have questions or feedback? We'd love to hear from you.</p>
                </div>
                <div className="flex gap-4 mt-4 md:mt-6 md:justify-center">
                    <a href="SmartBoard_SRS_v1.0.pdf" className="px-6 py-3 rounded-xl font-semibold text-secondary-accent border border-secondary-accent bg-transparent transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-xl" download>
                        SRS PDF
                    </a>
                    <a href="mailto:smartboard@ruhuna.lk" className="px-6 py-3 rounded-xl font-semibold text-white bg-primary border border-primary transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-xl">
                        Email Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ContactBanner;