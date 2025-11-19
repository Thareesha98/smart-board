import Header from "../components/Header";
import Hero from "../components/Hero";
import FeaturesSection from "../components/FeaturesSection";
import ProcessSection from "../components/ProcessSection";
import RolesSection from "../components/RolesSection";
import TeamSection from "../components/TeamSection";
import ContactBanner from "../components/ContactBanner";
import Footer from "../components/Footer";
import { useState, useEffect, useCallback } from "react";

export function LandingPage() {
const [isNavActive, setIsNavActive] = useState(false);

    // Toggle function passed to the Header component
    const handleNavToggle = () => {
        setIsNavActive(prev => !prev);
    };

    // 2. Global Logic: Smooth scrolling implementation
    const handleSmoothScroll = useCallback((e) => {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close nav on link click in mobile view
                if (window.innerWidth <= 960) {
                    setIsNavActive(false);
                }
            }
        }
    }, []);

    // 3. Lifecycle Hook: Attaches event listeners for smooth scrolling
    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', handleSmoothScroll);
        });

        return () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.removeEventListener('click', handleSmoothScroll);
            });
        };
    }, [handleSmoothScroll]);

    // 4. Component Orchestration (The main render function)
    return (
        <div className="font-inter text-text leading-relaxed pb-xl bg-light antialiased">
            <Header 
                isNavActive={isNavActive} 
                onNavToggle={handleNavToggle} 
                onSmoothScroll={handleSmoothScroll} 
            />
            <Hero onSmoothScroll={handleSmoothScroll} />
            
            <FeaturesSection />
            <ProcessSection />
            <RolesSection />
            <TeamSection />
            <ContactBanner />
            
            <Footer onSmoothScroll={handleSmoothScroll} />
        </div>
    );
};