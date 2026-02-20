import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

// Footer
const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                SB
              </div>
              <span className="text-xl font-bold">SmartBoAD</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              The smart solution for university boarding management. Connecting students with quality, verified accommodations.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center hover:bg-red-500 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center hover:bg-red-500 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center hover:bg-red-500 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center hover:bg-red-500 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Features', 'Users', 'Advertise', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white hover:pl-2 transition-all">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Platform</h4>
            <ul className="space-y-3">
              {['Student Login', 'Owner Login', 'Admin Login', 'Search Boardings'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/80 hover:text-white hover:pl-2 transition-all">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/80">
                <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-1" />
                123 University Road, Colombo
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Phone className="w-5 h-5 text-orange-500" />
                +94 11 234 5678
              </li>
              <li className="flex items-center gap-3 text-white/80">
                <Mail className="w-5 h-5 text-orange-500" />
                info@smartboad.com
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 text-center text-white/80">
          <p>&copy; 2024 SmartBoAD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;