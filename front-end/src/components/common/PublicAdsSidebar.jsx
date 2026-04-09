import React, { useState, useEffect, useRef } from 'react';
import AdminService from '../../api/admin/AdminService';

const PublicAdsSidebar = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const VISIBLE_COUNT = 5; // show up to 5 ads at once
  const [startIndex, setStartIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [adAspectRatios, setAdAspectRatios] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  const mobileCarouselRef = useRef(null);
  const isAutoScrollingRef = useRef(false);
  const autoScrollReleaseRef = useRef(null);
  const visibleCount = isMobile ? 2 : VISIBLE_COUNT;

  useEffect(() => {
    fetchPublicAds();
  }, []);

  useEffect(() => {
    if (!sidebarRef.current) return undefined;

    const updateWidth = () => {
      if (sidebarRef.current) {
        setSidebarWidth(sidebarRef.current.clientWidth || 0);
      }
    };

    updateWidth();

    const observer = new ResizeObserver(() => updateWidth());
    observer.observe(sidebarRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const fetchPublicAds = async () => {
    setLoading(true);
    setError(null);
    try {
      const publicAds = await AdminService.getPublicAds();
      setAds(publicAds || []);
    } catch (err) {
      console.error('Failed to fetch public ads:', err);
      setError('Unable to load advertisements');
      setAds([]);
    } finally {
      setLoading(false);
    }
  };
  // Hooks and helpers for rotating visible ads — keep hooks at top to preserve call order
  useEffect(() => {
    setStartIndex(0);
    setMobileActiveIndex(0);
  }, [ads.length]);

  useEffect(() => {
    if (isMobile || ads.length <= visibleCount) return undefined;
    const interval = setInterval(() => {
      setStartIndex((s) => (s + visibleCount) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads.length, visibleCount, isMobile]);

  useEffect(() => {
    if (!isMobile || ads.length <= 1) return undefined;
    const interval = setInterval(() => {
      setMobileActiveIndex((prev) => (prev + 1) % ads.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [ads.length, isMobile]);

  useEffect(() => {
    if (!isMobile || !mobileCarouselRef.current) return;
    const carousel = mobileCarouselRef.current;
    const targetCard = carousel.children[mobileActiveIndex];
    const targetLeft = targetCard ? targetCard.offsetLeft : mobileActiveIndex * carousel.clientWidth;

    isAutoScrollingRef.current = true;
    if (autoScrollReleaseRef.current) {
      window.clearTimeout(autoScrollReleaseRef.current);
    }

    carousel.scrollTo({ left: targetLeft, behavior: 'smooth' });

    autoScrollReleaseRef.current = window.setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 450);
  }, [mobileActiveIndex, isMobile]);

  useEffect(() => {
    return () => {
      if (autoScrollReleaseRef.current) {
        window.clearTimeout(autoScrollReleaseRef.current);
      }
    };
  }, []);

  const getVisibleAds = () => {
    if (ads.length <= visibleCount) return ads;
    const end = startIndex + visibleCount;
    if (end <= ads.length) return ads.slice(startIndex, end);
    return ads.slice(startIndex).concat(ads.slice(0, end - ads.length));
  };

  const visibleAds = getVisibleAds();

  useEffect(() => {
    const nextRatios = {};

    visibleAds.forEach((ad) => {
      if (!ad.bannerImageUrl || adAspectRatios[ad.id]) return;

      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          setAdAspectRatios((prev) => ({
            ...prev,
            [ad.id]: img.naturalHeight / img.naturalWidth,
          }));
        }
      };
      img.src = ad.bannerImageUrl;
    });

    return () => {
      Object.keys(nextRatios).forEach((k) => delete nextRatios[k]);
    };
  }, [visibleAds, adAspectRatios]);

  const getAdHeight = (adId) => {
    const ratio = adAspectRatios[adId] || 0.62;
    const width = isMobile ? Math.min(sidebarWidth || 260, 300) : (sidebarWidth || 240);
    // Scale by real image ratio, then clamp so very tall banners don't dominate the page.
    const minHeight = isMobile ? 170 : 200;
    const maxHeight = isMobile ? 240 : 340;
    return Math.max(minHeight, Math.min(Math.round(width * ratio), maxHeight));
  };

  if (error) {
    return (
      <div className="w-full bg-white rounded-[20px] p-6 shadow-lg border-2 border-red-100">
        <h3 className="text-sm font-black text-red-600 uppercase tracking-widest">⚠ Error Loading Ads</h3>
        <p className="text-xs text-red-500 mt-2">{error}</p>
      </div>
    );
  }

  if (loading && isMobile) {
    return (
      <aside className="w-full p-0">
        <div className="space-y-2 sm:space-y-3">
          {Array.from({ length: visibleCount }).map((_, idx) => (
            <div
              key={idx}
              className="w-full rounded-xl bg-gradient-to-r from-white/10 via-white/15 to-white/10 animate-pulse"
              style={{ height: isMobile ? '130px' : '180px' }}
            />
          ))}
        </div>
      </aside>
    );
  }

  if (visibleAds.length === 0) return null;

  // Keep desktop rendering unchanged; apply the refreshed sponsored block only on mobile.
  if (!isMobile) {
    return (
      <aside ref={sidebarRef} className="w-full flex flex-col gap-2 sm:gap-3">
        {visibleAds.map((ad) => (
          <a
            key={ad.id}
            href={ad.redirectUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-[#e0d6c5] bg-white/95 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-[#D84C38]"
          >
            {ad.bannerImageUrl ? (
              <img
                src={ad.bannerImageUrl}
                alt={ad.title}
                style={{ height: `${getAdHeight(ad.id)}px` }}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div style={{ height: `${getAdHeight(ad.id)}px` }} className="w-full bg-gradient-to-r from-[#D84C38] to-[#E6633F] flex items-center justify-center p-3">
                <h4 className="text-white font-black text-sm text-center line-clamp-2">{ad.title}</h4>
              </div>
            )}
          </a>
        ))}
      </aside>
    );
  }

  return (
    <aside ref={sidebarRef} className="w-full p-0">
      <div
        ref={mobileCarouselRef}
        onScroll={(e) => {
          if (isAutoScrollingRef.current) return;
          const { scrollLeft, clientWidth } = e.currentTarget;
          if (!clientWidth) return;
          const nextIndex = Math.round(scrollLeft / clientWidth);
          if (nextIndex !== mobileActiveIndex) {
            setMobileActiveIndex(nextIndex);
          }
        }}
        className="flex overflow-x-auto snap-x snap-mandatory gap-0 no-scrollbar"
      >
        {ads.map((ad) => (
          <a
            key={ad.id}
            href={ad.redirectUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group block min-w-full snap-start rounded-xl overflow-hidden transition-all duration-300"
          >
            <div className="relative">
              {ad.bannerImageUrl ? (
                <img
                  src={ad.bannerImageUrl}
                  alt={ad.title}
                  style={{ height: `${getAdHeight(ad.id)}px` }}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div style={{ height: `${getAdHeight(ad.id)}px` }} className="w-full bg-gradient-to-r from-[#D84C38] to-[#E6633F] flex items-center justify-center p-3">
                  <h4 className="text-white font-black text-sm text-center line-clamp-2">{ad.title}</h4>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/25 to-transparent">
                <p className="text-white font-semibold text-xs line-clamp-2">{ad.title || 'Sponsored Promotion'}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {ads.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {ads.map((ad, index) => (
            <button
              key={ad.id}
              type="button"
              aria-label={`Go to ad ${index + 1}`}
              onClick={() => setMobileActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === mobileActiveIndex ? 'w-5 bg-[#D84C38]' : 'w-1.5 bg-[#d3c1ae]'
              }`}
            />
          ))}
        </div>
      )}
    </aside>
  );
};

export default PublicAdsSidebar;
