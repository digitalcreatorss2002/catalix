import { Link } from 'react-router-dom';
import BrandSlider from '../components/BrandSlider';
import { useEffect, useMemo, useState } from 'react';
import { brandService, categoryService, productService, fileService, bannerService } from '../services/supabaseService';
import { sortBrands } from '../utils/brandSort';
import bonheurImage from '../assets/bonheur.svg';
import japotupImage from '../assets/japtoup.svg';
import klenshineImage from '../assets/klenshine.svg';

const Landing = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [brandsResult, categoriesResult, productsResult, bannersResult] = await Promise.all([
          brandService.getBrands(),
          categoryService.getCategories(),
          productService.getProducts(),
          bannerService.getActiveBanners()
        ]);
        if (brandsResult.data) setBrands(brandsResult.data);
        if (categoriesResult.data) setCategories(categoriesResult.data);
        if (productsResult.data) setProducts(productsResult.data);
        if (bannersResult.data) {
          const activeBanners = bannersResult.data || [];
          console.log('Banners loaded:', activeBanners);
          setBanners(activeBanners);
        } else {
          console.log('No banners data received');
          setBanners([]);
        }
      } catch (e) {
        console.error('Error loading landing data:', e);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Sort brands and get featured (first 3)
  const sortedBrands = useMemo(() => sortBrands(brands), [brands]);
  const featuredBrands = useMemo(() => sortedBrands.slice(0, 3), [sortedBrands]);

  const brandIdToProductCount = useMemo(() => {
    const counts = new Map();
    products.forEach(p => {
      const id = p.brand_id || p.brand?.id || p.brands?.id;
      if (id) counts.set(id, (counts.get(id) || 0) + 1);
    });
    return counts;
  }, [products]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden" style={{ width: '100%', maxWidth: '100%', margin: 0, padding: 0 }}>
      {/* Banner Slider */}
      {banners.length > 0 && (
        <section className="w-full overflow-hidden" style={{ 
          width: '100%', 
          maxWidth: '100%', 
          overflow: 'hidden',
          margin: 0,
          padding: 0,
          position: 'relative'
        }}>
          <BrandSlider banners={banners} />
        </section>
      )}

      {/* About Us Section */}
      <section className="py-8 md:py-12 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                About Catalixo Global Private Limited
              </h2>
            </div>
            
            <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-4 mb-8 md:mb-12">
              <p>
                Catalixo Global Private Limited is a Consumer First FMCG company built with one purpose to delight our consumers by improving their everyday living through products and brands that people trust, rely on, and grow with. We operate in high-utility categories offering high quality products at great value.
              </p>
              <p className="font-bold text-xl md:text-2xl text-primary-600 text-center mb-6 md:mb-8">
                Our Growing Portfolio includes:
              </p>
              
              {/* Brand Portfolio Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 my-6 md:my-8">
                {brands.slice(0, 3).map(brand => {
                  if (!brand.slug) return null;
                  
                  // Map brand names to portfolio images
                  const getPortfolioImage = (brandName) => {
                    const name = brandName?.toLowerCase();
                    if (name?.includes('klenshine')) return klenshineImage;
                    if (name?.includes('japotup')) return japotupImage;
                    if (name?.includes('bonheur')) return bonheurImage;
                    return null;
                  };
                  
                  const portfolioImage = getPortfolioImage(brand.name);
                  
                  return (
                    <Link
                      key={brand.id}
                      to={`/brands/${brand.slug}`}
                      className="group block"
                    >
                      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full">
                        {/* Portfolio Image */}
                        <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: '294/350' }}>
                          {portfolioImage ? (
                            <img
                              src={portfolioImage}
                              alt={`${brand.name} portfolio`}
                              className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                              <div className="text-center">
                                <svg className="w-16 h-16 text-primary-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-sm text-primary-400 font-medium">Add Portfolio Image</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Brand Info */}
                        {/*<div className="p-4 md:p-6">
                          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                            {brand.name}
                          </h3>
                          <p className="text-sm md:text-base text-gray-600 line-clamp-2">
                            {brand.description || 'Explore premium products from this brand.'}
                          </p>
                        </div>*/}
                      </div>
                    </Link>
                  );
                })}
              </div>

              <p className="font-semibold text-gray-900 italic">
                Rooted in India. Built for the World.
              </p>
              <p>
                We believe Indian brands can compete at global standards without losing their identity or affordability. Catalixo Global brings together local manufacturing, disciplined processes, and data-led consumer insights to build scalable FMCG solutions for India first and the world next.
              </p>
              <p>
                Every brand is structured to expand across categories, deepen utility, and create long-term value for consumers, channel partners, suppliers, and key accounts alike.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
              <div className="bg-primary-50 rounded-xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To be a trusted name in home essentials empowering consumers and partners with reliable, high-quality products across multiple categories. Through process excellence and consumer understanding, we aim to become the preferred Indian alternative in markets currently led by global brands.
                </p>
              </div>
              <div className="bg-primary-50 rounded-xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To make trusted, high-quality home essentials accessible to every household. We aspire to bridge the gap between affordability and reliability, proudly building Indian brands that enrich everyday living through trust, quality, and value.
                </p>
              </div>
            </div>

            <p className="text-center text-lg md:text-xl font-semibold text-primary-600 mb-8 md:mb-12">
            Global in Ambition. Proudly Indian at heart.
            </p>
            <p className="text-center text-xl md:text-2xl font-bold text-gray-900">
              Catalixo Global - Quality Products, Great Value
            </p>
          </div>

          {/* Icon Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Trust & Quality</h3>
              <p className="text-sm md:text-base text-gray-600">We build brands that consumers rely on every time.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Consumer Understanding</h3>
              <p className="text-sm md:text-base text-gray-600">Each category grows from deep insights, catering to everyday needs.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Built to Grow</h3>
              <p className="text-sm md:text-base text-gray-600">Structured to scale across products, brands, regions, and channels.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Homegrown Global Vision</h3>
              <p className="text-sm md:text-base text-gray-600">Indian at heart, Global in Ambition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands with Shop Now */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Brand
            </h2>
            <p className="text-lg text-gray-600">
             From our Shelves to your Homes, Discover a World of Quality Products that never compromise on Value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredBrands.map(brand => {
              if (!brand.slug) {
                console.warn(`Brand ${brand.name} (ID: ${brand.id}) is missing a slug`);
                return null;
              }
              return (
                <Link
                  key={brand.id}
                  to={`/brands/${brand.slug}`}
                  className="card overflow-hidden group hover:shadow-xl transition-all duration-300 block"
                >
                  {/* Brand Image */}
                  <div className="relative w-full overflow-hidden bg-gray-100">
                    {brand.hero_image_url ? (
                      <img
                        src={brand.hero_image_url.startsWith('http') || brand.hero_image_url.includes('/storage/v1/object/public/')
                          ? brand.hero_image_url
                          : fileService.getPublicUrl('brand-heroes', brand.hero_image_url)}
                        alt={brand.name}
                        className="w-full h-auto object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-100" />
                    )}
                  </div>

                  {/* Shop Now Button */}
                  <div className="p-6">
                    <div className="btn-primary w-full text-center inline-flex items-center justify-center gap-2 group/btn cursor-pointer">
                      Shop Now
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View All Brands Button */}
          <div className="text-center mt-12">
            <Link
              to="/brands"
              className="btn-outline inline-flex items-center gap-2 text-lg"
            >
              View All Brands
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-8 md:py-12 lg:py-20 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-6">Our Brands</h2>
              <p className="text-base md:text-lg lg:text-xl text-white/90">Products that elevate everyday routines across cleaning, pooja, and lifestyle needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-8 text-center">
                <div className="bg-white/20 p-3 md:p-4 rounded-lg inline-block mb-4">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2">Home & Daily Living</h3>
                <p className="text-sm md:text-base text-white/80">Products that elevate everyday routines across cleaning, pooja, and lifestyle needs.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-8 text-center">
                <div className="bg-white/20 p-3 md:p-4 rounded-lg inline-block mb-4">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2">Quality & Trust</h3>
                <p className="text-sm md:text-base text-white/80">Reliability and consistency across every brand are built on national brand equivalent standards.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-8 text-center">
                <div className="bg-white/20 p-3 md:p-4 rounded-lg inline-block mb-4">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2">Innovation & Progress</h3>
                <p className="text-sm md:text-base text-white/80">Driven by ideas, insights, and product development for consumers.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 lg:p-8 text-center">
                <div className="bg-white/20 p-3 md:p-4 rounded-lg inline-block mb-4">
                  <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg lg:text-xl font-bold mb-2">Value for Every Home</h3>
                <p className="text-sm md:text-base text-white/80">Accessible, Premium, Super Value multi-category offerings built for every home.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Improved Design */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50"></div>
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%230284c7" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Main Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Ready to Start Shopping?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover high-quality products from trusted brands. Experience quality, trust, and value with every purchase at Catalixo Global.
              </p>
            </div>

            {/* CTA Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <Link
                to="/products"
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-600"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary-100 p-4 rounded-xl group-hover:bg-primary-600 transition-colors">
                    <svg className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      Browse Products
                    </h3>
                    <p className="text-gray-600">Ready To Shop? Explore the Best here!</p>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>

              <Link
                to="/brands"
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-600"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary-100 p-4 rounded-xl group-hover:bg-primary-600 transition-colors">
                    <svg className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                   Explore Brands
                    </h3>
                    <p className="text-gray-600">Explore the Brands we’ve hand-selected to welcome you home.</p>
                  </div>
                  <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">3+</div>
                  <div className="text-sm md:text-base text-gray-600">Trusted Brands</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">100%</div>
                  <div className="text-sm md:text-base text-gray-600">Proudly Indian</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">Premium</div>
                  <div className="text-sm md:text-base text-gray-600">Quality Products</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">24/7</div>
                  <div className="text-sm md:text-base text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

