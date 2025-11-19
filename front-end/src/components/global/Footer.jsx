import React from 'react';

const LOGO_PATH = "https://www.ruh.ac.lk/wp-content/themes/ruhuna/favicon.ico";

const Footer = ({ onSmoothScroll }) => {
    return (
        <footer className="bg-primary text-white pt-12 pb-8 mt-[-25px] rounded-t-xl">
            <div className="max-w-[1200px] mx-auto p-6">
                <div className="grid grid-cols-4 gap-8 md:grid-cols-1 md:gap-6 md:text-center">
                    <div className="col-span-2 md:col-span-1 md:border-b md:border-white/10 md:pb-4 md:mb-4">
                        <a href="#" className="flex items-center gap-3 text-white no-underline md:justify-center">
                            <img src={LOGO_PATH} alt="SmartBoAD Logo" className="h-[50px] w-auto rounded-[15px]" />
                            <div className="text-white">
                                <strong className="block text-xl font-bold leading-none">SmartBoAD</strong>
                                <small className="block text-xs text-white/70">Boarding Management</small>
                            </div>
                        </a>
                        <p className="text-sm text-white/60 mt-4 md:mt-2">
                            &copy; 2024 SmartBoAD. All rights reserved.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="md:border-b md:border-white/10 md:pb-4 md:mb-4">
                        <h4 className="text-lg font-bold mb-4 text-accent">Quick Links</h4>
                        <a href="#home" className="block text-white/80 no-underline mb-2 transition-colors duration-300 hover:text-white hover:underline md:inline-block md:mx-2" onClick={onSmoothScroll}>Home</a>
                        <a href="#features" className="block text-white/80 no-underline mb-2 transition-colors duration-300 hover:text-white hover:underline md:inline-block md:mx-2" onClick={onSmoothScroll}>Features</a>
                        <a href="#roles" className="block text-white/80 no-underline mb-2 transition-colors duration-300 hover:text-white hover:underline md:inline-block md:mx-2" onClick={onSmoothScroll}>User Roles</a>
                        <a href="#team" className="block text-white/80 no-underline mb-2 transition-colors duration-300 hover:text-white hover:underline md:inline-block md:mx-2" onClick={onSmoothScroll}>Team</a>
                    </div>

                    {/* Legal */}
                    <div className="md:border-b md:border-white/10 md:pb-4 md:mb-4">
                        <h4 className="text-lg font-bold mb-4 text-accent">Legal</h4>
                        <a href="#" className="block text-white/80 no-underline mb-2 transition-colors duration-300 hover:text-white hover:underline md:inline-block md:mx-2">Privacy Policy</a>
                        <a href="#" className="block text-white/80 no-underline mb-2 transition-colors duration-300 hover:text-white hover:underline md:inline-block md:mx-2">Terms of Service</a>
                        <a href="#" className="block text-white/80 no-underline mb-2 transition-colors duration-300 hover:text-white hover:underline md:inline-block md:mx-2">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;