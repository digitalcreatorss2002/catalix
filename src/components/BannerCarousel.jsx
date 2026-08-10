import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const BannerCarousel = ({ banners = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Track window width for responsive image selection
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality - only if more than 1 banner
  useEffect(() => {
    if (!isAutoPlaying || banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  // Reset to first slide when banners change
  useEffect(() => {
    if (banners.length > 0 && currentSlide >= banners.length) {
      setCurrentSlide(0);
    }
  }, [banners.length, currentSlide]);

  const goToSlide = (index) => {
    if (index < 0 || index >= banners.length) return;
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    if (banners.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    if (banners.length <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!banners || banners.length === 0) {
    return null;
  }

  // Filter out banners without images
  const validBanners = banners.filter(b => b.image_url);
  
  if (validBanners.length === 0) {
    console.warn('BannerCarousel: No banners with valid image_url found');
    return null;
  }

  return (
    <div className="relative w-full overflow-hidden group" style={{ width: '100%' }}>
      {/* Slider Container */}
      <div className="relative w-full h-[40vh] min-h-[300px] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] xl:h-[65vh] max-h-[800px] overflow-hidden bg-gray-100">
        {validBanners.map((banner, index) => {
          // Use mobile image on mobile devices if available, otherwise use desktop image
          const isMobile = windowWidth < 768;
          const imageUrl = isMobile && banner.mobile_image_url 
            ? banner.mobile_image_url 
            : banner.image_url;

          return (
            <div
              key={banner.id || index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
              style={{ 
                width: '100%', 
                height: '100%',
                maxWidth: '100%',
                overflow: 'hidden'
              }}
            >
              {banner.link_url ? (
                <Link 
                  to={banner.link_url} 
                  className="block w-full h-full"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    display: 'block'
                  }}
                >
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={banner.title || 'Banner'} 
                      className="w-full h-full object-cover"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </Link>
              ) : (
                <div 
                  className="block w-full h-full"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    display: 'block'
                  }}
                >
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={banner.title || 'Banner'} 
                      className="w-full h-full object-cover"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows - Always visible on desktop when multiple banners */}
      {validBanners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-900 p-3 lg:p-4 rounded-full hover:bg-white transition-all shadow-2xl hover:scale-110 items-center justify-center z-30 opacity-70 hover:opacity-100"
            style={{ left: '1rem' }}
            aria-label="Previous slide"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-gray-900 p-3 lg:p-4 rounded-full hover:bg-white transition-all shadow-2xl hover:scale-110 items-center justify-center z-30 opacity-70 hover:opacity-100"
            style={{ right: '1rem' }}
            aria-label="Next slide"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Navigation - Smaller on mobile */}
      {validBanners.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
          {validBanners.map((_, index) => (
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

      {/* Slide Counter - Smaller on mobile */}
      {validBanners.length > 1 && (
        <div className="absolute top-4 md:top-8 bg-white/90 backdrop-blur-md px-3 py-1.5 md:px-6 md:py-3 rounded-full shadow-xl z-30" style={{ right: '1rem' }}>
          <span className="font-bold text-gray-900 text-sm md:text-base lg:text-lg">
            {currentSlide + 1} / {validBanners.length}
          </span>
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;

