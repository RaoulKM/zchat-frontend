import React, { useState, useEffect } from "react";

const images = ["./image.png", "./i1.png", "./i2.png"];

const AuthImageCarousel = ({
  title,
  subtitle,
  autoPlay = true,
  delay = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, delay);

    return () => clearInterval(timer);
  }, [autoPlay, delay]);

  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-base-200 p-12 rounded-xl w-full max-w-7xl mx-auto">
      {/* Title & Subtitle */}
      <div className="max-w-2xl text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-base-content/70">{subtitle}</p>
      </div>

      {/* Carousel Images */}
      <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] rounded-xl overflow-hidden">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 rounded-xl
              ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
          />
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="flex gap-3 mt-4">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full cursor-pointer transition-colors
              ${index === currentIndex ? "bg-primary" : "bg-base-300"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthImageCarousel;
