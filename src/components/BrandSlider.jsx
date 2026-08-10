import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const BrandSlider = ({ banners = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Track window width for responsive banner images
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only banners in slides (ordered by position)
  const slides = useMemo(() => {
    return (banners || []).map(banner => ({
      type: 'banner',
      ...banner
    }));
  }, [banners]);

  // Reset slide if out of bounds
  useEffect(() => {
    if (slides.length > 0 && currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  // Manual slide navigation only - no auto-play
  const goToSlide = (index) => {
    if (index < 0 || index >= slides.length) return;
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Early return if no slides
  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden group" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden', margin: 0, padding: 0 }}>
      {/* Slider Container */}
      <div className="relative w-full h-[40vh] min-h-[300px] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-[65vh] 2xl:h-[70vh] max-h-[900px] overflow-hidden" style={{ 
        width: '100%', 
        maxWidth: '100%', 
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        position: 'relative'
      }}>
        {slides.map((slide, index) => {
          // Banner: Use mobile image on mobile if available
          const isMobile = windowWidth < 768;
          const imageUrl = isMobile && slide.mobile_image_url 
            ? slide.mobile_image_url 
            : slide.image_url;
          const imageAlt = slide.title || 'Banner';
          const linkTo = slide.link_url || '#';

          return (
            <div
              key={slide.id || slide.type + index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{ 
                width: '100%', 
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                overflow: 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 0,
                padding: 0
              }}
            >
              {/* Image */}
              <div style={{ 
                width: '100%', 
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                overflow: 'hidden',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 0,
                padding: 0
              }}>
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={imageAlt} 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'fill',
                      objectPosition: 'center',
                      display: 'block',
                      margin: 0,
                      padding: 0
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>

              {/* Explore Button - Only for current slide */}
              {index === currentSlide && linkTo && linkTo !== '#' && (
                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-40">
                  <Link
                    to={linkTo}
                    className="inline-flex items-center gap-2 px-6 py-2.5 md:px-7 md:py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm md:text-base font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    Explore
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows - Always visible on desktop when multiple slides */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-900 p-3 lg:p-4 rounded-full hover:bg-white transition-all shadow-2xl hover:scale-110 items-center justify-center z-30 opacity-70 hover:opacity-100"
            style={{ left: '1rem', maxLeft: '1rem' }}
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-900 p-3 lg:p-4 rounded-full hover:bg-white transition-all shadow-2xl hover:scale-110 items-center justify-center z-30 opacity-70 hover:opacity-100"
            style={{ right: '1rem', maxRight: '1rem' }}
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Navigation - Smaller on mobile */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 md:w-12 h-2 md:h-3 bg-white shadow-lg'
                  : 'w-2 md:w-3 h-2 md:h-3 bg-white/60 hover:bg-white/90 shadow-md'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default BrandSlider;

