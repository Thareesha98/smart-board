import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from './assets/logo.png';
import backgroundImage from './assets/s5.jpg';
import BoardingCard from './components/student/search/BoardingCard';
import StudentService from './api/student/StudentService';
import { sampleBoardings } from './data/student/searchBoardingsData';

const Home = () => {
  const navigate = useNavigate();
  const [isSubmittingAd, setIsSubmittingAd] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    adTitle: '',
    adDescription: '',
    website: '',
    image: null,
    searchQuery: ''
  });
  
  const [boardings, setBoardings] = useState([]);
  const [loadingBoardings, setLoadingBoardings] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 50000,
    gender: 'any',
    roomType: 'any'
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmitAd = async (e) => {
    e.preventDefault();
    setIsSubmittingAd(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'searchQuery' && formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const AdminService = (await import('./api/admin/AdminService')).default;
      await AdminService.submitThirdPartyAd(formDataToSend);

      setSuccessMessage('✓ Your ad has been submitted successfully!');
      setFormData({
        companyName: '', email: '', phone: '', adTitle: '',
        adDescription: '', website: '', image: null, searchQuery: ''
      });
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      setErrorMessage(`✗ Failed to submit ad: ${error.message}`);
    } finally {
      setIsSubmittingAd(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fetchBoardings = async (p = page, size = pageSize) => {
    setLoadingBoardings(true);
    try {
      const searchFilters = {
        searchQuery: formData.searchQuery || '',
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        gender: filters.gender,
        roomTypes: filters.roomType === 'any' ? [] : [filters.roomType]
      };
      const data = await StudentService.searchBoardings(searchFilters, p, size);
      const list = Array.isArray(data) ? data : (data.content || []);
      
      if (!list || list.length === 0) {
        setBoardings(sampleBoardings.slice(0, size));
        setTotalPages(1);
      } else {
        setBoardings(list);
        setTotalPages(data.totalPages || 1);
      }
    } catch (e) {
      setBoardings(sampleBoardings.slice(0, size));
      setTotalPages(1);
    } finally {
      setLoadingBoardings(false);
    }
  };

  useEffect(() => {
    fetchBoardings();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden font-sans">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(4px)",
          transform: "scale(1.05)",
        }}
      />
      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-6xl"
          >
            {/* Header / Navbar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 py-4 px-6 rounded-2xl mb-12 shadow-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img src={logo} alt="SmartBoAD" className="h-10 w-10 rounded-lg shadow-inner" />
                <h1 className="text-2xl font-black text-white tracking-tight">SmartBoAD</h1>
              </div>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl transition-all font-bold text-sm backdrop-blur-sm"
              >
                Login
              </button>
            </motion.div>

            {/* Hero Section */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
                Welcome To <span className="text-accent">SmartBoAD</span>
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">
                The premier destination for student boarding and property advertising.
              </p>
            </motion.div>
            
            {/* Transparent Search Panel */}
            <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20 mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">Find Your Boarding</h3>
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                  type="text"
                  placeholder="Where do you want to stay?"
                  value={formData.searchQuery || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="flex-1 px-5 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 text-white placeholder:text-white/50"
                />
                <button
                  onClick={() => fetchBoardings()}
                  className="px-8 py-4 bg-accent hover:bg-accent/80 text-white rounded-2xl font-bold transition-all shadow-lg transform hover:-translate-y-1"
                >
                  Search Now
                </button>
              </div>

              {/* Advanced Filters */}
              <div className="flex flex-wrap gap-6 items-end border-t border-white/10 pt-8 text-white">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60">Price Range (LKR)</label>
                  <div className="flex gap-2">
                    <input type="number" placeholder="Min" value={filters.minPrice} onChange={(e)=>setFilters(prev=>({...prev, minPrice: Number(e.target.value)}))} className="w-28 px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm" />
                    <input type="number" placeholder="Max" value={filters.maxPrice} onChange={(e)=>setFilters(prev=>({...prev, maxPrice: Number(e.target.value)}))} className="w-28 px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60">Gender</label>
                  <select value={filters.gender} onChange={(e)=>setFilters(prev=>({...prev, gender: e.target.value}))} className="w-32 px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm appearance-none cursor-pointer [&>option]:text-black">
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white/60">Room Type</label>
                  <select value={filters.roomType} onChange={(e)=>setFilters(prev=>({...prev, roomType: e.target.value}))} className="w-32 px-3 py-2 bg-white/5 border border-white/20 rounded-xl text-sm appearance-none cursor-pointer [&>option]:text-black">
                    <option value="any">Any</option>
                    <option value="single">Single</option>
                    <option value="shared">Shared</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>

                <button onClick={() => { setPage(0); fetchBoardings(0, pageSize); }} className="ml-auto px-6 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary/80 transition-all">
                  Apply
                </button>
              </div>

              {/* Listings Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {loadingBoardings ? (
                  <div className="col-span-full text-center py-20 text-white font-medium animate-pulse">Loading listings...</div>
                ) : (
                  boardings.map((b) => (
                    <div key={b.id} className="transform hover:scale-[1.02] transition-transform">
                      <BoardingCard boarding={{
                        ...b,
                        name: b.name || b.title || 'Boarding',
                        price: b.price || b.monthlyRent || 0,
                        image: b.image || (b.images && b.images[0]) || '',
                        location: b.location || b.address || '',
                        amenities: b.amenities || b.features || [],
                        badge: b.badge || (b.isBoosted ? 'Featured' : null),
                      }} />
                    </div>
                  ))
                )}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                <div className="flex gap-4">
                  <button
                    onClick={() => { if (page > 0) { setPage(p => p - 1); fetchBoardings(page - 1, pageSize); } }}
                    disabled={page <= 0}
                    className="px-5 py-2 bg-white/10 text-white rounded-xl disabled:opacity-30 border border-white/10"
                  >Previous</button>
                  <button
                    onClick={() => { if (page + 1 < totalPages) { setPage(p => p + 1); fetchBoardings(page + 1, pageSize); } }}
                    disabled={page + 1 >= (totalPages || 1)}
                    className="px-5 py-2 bg-white/10 text-white rounded-xl disabled:opacity-30 border border-white/10"
                  >Next</button>
                </div>
                <span className="text-white/60 text-sm font-bold uppercase tracking-widest">Page {page + 1} / {totalPages || 1}</span>
              </div>
            </motion.div>

            {/* Transparent Ad Form Panel */}
            <motion.div
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 border border-white/20 mb-20"
            >
              <div className="mb-8">
                <h3 className="text-3xl font-black text-white mb-2">Advertise Your Business</h3>
                <p className="text-white/60 font-medium">Target thousands of students daily with our ad platform.</p>
              </div>

              {successMessage && <div className="mb-6 p-4 bg-green-500/20 border border-green-500/40 rounded-2xl text-green-200 text-sm font-bold">{successMessage}</div>}
              {errorMessage && <div className="mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-2xl text-red-200 text-sm font-bold">{errorMessage}</div>}

              <form onSubmit={handleSubmitAd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleInputChange} required className="w-full px-5 py-3 bg-white/5 border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-accent/50 outline-none" />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required className="w-full px-5 py-3 bg-white/5 border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-accent/50 outline-none" />
                  <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-5 py-3 bg-white/5 border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-accent/50 outline-none" />
                </div>
                <div className="space-y-4">
                  <input type="text" name="adTitle" placeholder="Ad Title" value={formData.adTitle} onChange={handleInputChange} required className="w-full px-5 py-3 bg-white/5 border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-accent/50 outline-none" />
                  <textarea name="adDescription" placeholder="Description" value={formData.adDescription} onChange={handleInputChange} required rows="3" className="w-full px-5 py-3 bg-white/5 border border-white/20 rounded-2xl text-white focus:ring-2 focus:ring-accent/50 outline-none resize-none" />
                </div>
                <div className="md:col-span-2 flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-full md:w-1/2 p-4 border-2 border-dashed border-white/20 rounded-2xl text-center">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="text-white text-xs" />
                  </div>
                  <button type="submit" disabled={isSubmittingAd} className="w-full md:w-1/2 py-4 bg-gradient-to-r from-primary to-accent text-white font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50">
                    {isSubmittingAd ? 'Processing...' : 'Submit Advertisement'}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              {[
                { icon: 'fa-search', title: 'Smart Filters', desc: 'Find exactly what you need in seconds.' },
                { icon: 'fa-shield-alt', title: 'Verified Hosts', desc: 'We vet every owner for your safety.' },
                { icon: 'fa-clock', title: 'Real-time', desc: 'Instant bookings and availability updates.' },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 text-center text-white hover:bg-white/10 transition-all shadow-xl">
                  <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent">
                    <i className={`fas ${feature.icon} text-2xl`}></i>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
                  <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Deep Dark Footer */}
        <motion.footer className="w-full bg-[#05080f]/90 backdrop-blur-md text-white/90 pt-20 pb-10 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h4 className="text-2xl font-black text-white">SmartBoAD</h4>
              <p className="text-white/50 text-sm leading-relaxed">The island's most trusted platform for student housing. Connecting dreams with locations.</p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Navigation</h5>
              <ul className="text-sm text-white/50 space-y-3">
                <li className="hover:text-accent transition-colors cursor-pointer">Search Listings</li>
                <li className="hover:text-accent transition-colors cursor-pointer">My Appointments</li>
                <li className="hover:text-accent transition-colors cursor-pointer">Help Center</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">For Partners</h5>
              <ul className="text-sm text-white/50 space-y-3">
                <li className="hover:text-accent transition-colors cursor-pointer">Add Property</li>
                <li className="hover:text-accent transition-colors cursor-pointer">Business Solutions</li>
                <li className="hover:text-accent transition-colors cursor-pointer">API Docs</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-white uppercase tracking-widest text-xs">Connect</h5>
              <div className="flex gap-4 mb-6">
                {[1,2,3].map(i => <div key={i} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:bg-accent transition-all cursor-pointer"></div>)}
              </div>
              <p className="text-white/40 text-xs tracking-tight">© 2026 SmartBoAD Digital. All Rights Reserved.</p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Home;