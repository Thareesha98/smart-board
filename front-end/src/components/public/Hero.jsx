import React from "react";

const Hero = ({ onSmoothScroll }) => {
  return (
    <section className="w-full py-28 bg-[#f7e4dc]">
      <div className="max-w-[1250px] mx-auto px-6 grid grid-cols-2 gap-12 items-center md:grid-cols-1">

        {/* LEFT SIDE — TEXT */}
        <div className="space-y-6 md:text-center md:order-2">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-[#d6452e]">
            Find verified university boardings
            <br />
            easily with <span className="text-[#ff7a00]">SmartBoAD</span>
          </h1>

          <p className="text-gray-700 max-w-[550px] md:mx-auto text-lg">
            SmartBoAD connects students, owners, and administrators on a single
            secure platform for booking, payments, and management.
          </p>

          <div className="flex gap-4 md:justify-center">
            <a
              href="signup.html"
              className="px-7 py-3 bg-[#ff7a00] text-white font-semibold rounded-2xl shadow-md hover:shadow-lg transition"
            >
              Sign Up
            </a>

            <button
              onClick={onSmoothScroll}
              className="px-7 py-3 border border-[#ff7a00] text-[#ff7a00] font-semibold rounded-2xl shadow-md hover:shadow-lg transition"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* RIGHT SIDE — IMAGE */}
        <div className="md:order-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
            alt="boarding preview"
            className="w-[550px] h-auto rounded-3xl shadow-xl object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
