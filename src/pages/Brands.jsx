import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiAward } from 'react-icons/fi';
import BrandCard from '../components/BrandCard';
import Breadcrumb from '../components/Breadcrumb';
import { brandService, productService, fileService } from '../services/supabaseService';
import { sortBrands } from '../utils/brandSort';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Add timeout as safety net
    const timeout = setTimeout(() => {
      if (isMounted) {
        setLoading(false);
      }
    }, 8000);
    
    (async () => {
      try {
        const [brandsResult, productsResult] = await Promise.all([
          brandService.getBrands(),
          productService.getActiveProducts()
        ]);
        if (!isMounted) return;
        
        if (brandsResult.error) {
          console.error('Error fetching brands:', brandsResult.error);
          setBrands([]);
        } else {
          setBrands(Array.isArray(brandsResult.data) ? brandsResult.data : []);
        }
        
        if (productsResult.error) {
          console.error('Error fetching products:', productsResult.error);
          setProducts([]);
        } else {
          setProducts(Array.isArray(productsResult.data) ? productsResult.data : []);
        }
      } catch (err) {
        console.error('Unexpected error fetching data:', err);
        if (isMounted) {
          setBrands([]);
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          clearTimeout(timeout);
        }
      }
    })();
    
    return () => { 
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  // Calculate product counts by brand
  const brandProductCounts = useMemo(() => {
    const counts = new Map();
    products.forEach(product => {
      const brandId = product.brand_id || product.brand?.id || product.brands?.id;
      if (brandId) {
        counts.set(brandId, (counts.get(brandId) || 0) + 1);
      }
    });
    return counts;
  }, [products]);

  // Merge product counts into brands
  const brandsWithCounts = useMemo(() => {
    return brands.map(brand => ({
      ...brand,
      product_count: brandProductCounts.get(brand.id) || 0,
      productCount: brandProductCounts.get(brand.id) || 0
    }));
  }, [brands, brandProductCounts]);

  // Brand stories mapping (fallback if not in database)
  const brandStoriesMap = {
    'klenshine': `KlenShine - Your Trusted Cleaning Partner

Cleaning isn't just about wiping away dust—it's about creating a healthier, fresher, and more vibrant space every day.

But why juggle multiple brands when one name can do it all?

One Brand, Every Cleaning Solution

At KlenShine, we believe that keeping your home spotless should be effortless. That's why we've built a one-stop brand for all your Home Care essentials. From tackling tough stains to maintaining everyday freshness, our premium yet affordable range ensures that no corner is left untouched.

Smart Cleaning, Simplified

Whether it's powerful liquid cleaners, essential cleaning aids, or everyday household tools, KlenShine delivers reliable, high-performance solutions tailored for all homes. Designed to make cleaning faster, easier, and more effective, our range evolves to meet your needs because a spotless home should never be a challenge.

Proudly Indian. Ready for the World.

KlenShine is proudly Made in India with global standards to exceed the expectations of our consumers worldwide.

From formulation to packaging to brand aura, every product reflects Indian expertise with world-class quality because we believe a homegrown brand can stand tall anywhere in the world. Engineered to solve local problems with global efficiency, KlenShine aims to carry the spirit of India beyond its borders, one clean home at a time.

Raising the Bar in the Cleaning Industry

For years, Home Care has been dominated by a few big names often leaving consumers with limited choices and high prices. But with E-Commerce reshaping how the world shops, it's time for a brand that offers superior quality without the premium price tag.

KlenShine is here to challenge the status quo, bringing top-tier cleaning solutions to every household, without compromise.

The KlenShine Commitment

✔ Reliable Quality – Effective and Efficient
✔ Affordable Excellence – Premium performance, practical pricing
✔ Convenience Redefined – Everything you need, under one trusted name
✔ Proudly Indian – Made In India Homegrown Brand
✔ Globally Driven – Created with standards that match the world

Everything Clean, Everything KlenShine.`,
    'japotup': `Japotup - Purity In Every Prayer
In every corner of India, prayers rise with the scent of incense, the glow of diyas, and the quiet rhythm of rituals. At Japotup, we honour these timeless traditions by bringing you everything you need to embrace your spiritual journey rooted in quality, purity, and devotion.
A Brand Born from Faith
Japotup was founded on a simple yet profound belief: that devotion should be effortless, and sacred essentials should be accessible to all. In a world that moves fast, we aim to be the gentle pause,  a name you turn to when you seek calm, connect with the divine, or prepare your home for prayer.
Sacred Offerings, Thoughtfully Curated
Our product range draws from tradition, crafted to meet the evolving needs of every home. While we currently offer premium incense sticks, dhoop, diya batti, camphor, ghee wicks, and dhoop cones, our vision extends far beyond. Japotup is designed to evolve—growing with your rituals, your preferences, and your faith.
Whether it's daily pooja or festive celebrations, Japotup is your trusted companion offering exceptional quality at prices that remain humble, just like the hands that light the first flame each morning.
A Place in Every Home, A Purpose in Every Offering
The market for spiritual products has long needed a brand that respects tradition, ensures quality, and speaks to all. With Japotup, we aspire to become that name—a household presence that brings a sense of completeness to your pooja thali.
We don't just offer products, we offer purity, peace, and a promise to walk with you in every sacred moment.`,
    'japtoup': `Japotup - Purity In Every Prayer
In every corner of India, prayers rise with the scent of incense, the glow of diyas, and the quiet rhythm of rituals. At Japotup, we honour these timeless traditions by bringing you everything you need to embrace your spiritual journey rooted in quality, purity, and devotion.
A Brand Born from Faith
Japotup was founded on a simple yet profound belief: that devotion should be effortless, and sacred essentials should be accessible to all. In a world that moves fast, we aim to be the gentle pause,  a name you turn to when you seek calm, connect with the divine, or prepare your home for prayer.
Sacred Offerings, Thoughtfully Curated
Our product range draws from tradition, crafted to meet the evolving needs of every home. While we currently offer premium incense sticks, dhoop, diya batti, camphor, ghee wicks, and dhoop cones, our vision extends far beyond. Japotup is designed to evolve—growing with your rituals, your preferences, and your faith.
Whether it's daily pooja or festive celebrations, Japotup is your trusted companion offering exceptional quality at prices that remain humble, just like the hands that light the first flame each morning.
A Place in Every Home, A Purpose in Every Offering
The market for spiritual products has long needed a brand that respects tradition, ensures quality, and speaks to all. With Japotup, we aspire to become that name—a household presence that brings a sense of completeness to your pooja thali.
We don't just offer products, we offer purity, peace, and a promise to walk with you in every sacred moment.`,
    'bonheur': `Bonheur - Celebrate Your Spark
In a world full of noise, true style exists in the quiet details. Bonheur was created with a simple belief that everyday essentials should do more than serve a function; they should express individuality, enhance confidence, and elevate the way we live.
Not just a brand,
It's a way of life built around thoughtful design and effortless sophistication. Our focus is on accessories and lifestyle essentials that are timeless, and purpose-driven. We believe luxury doesn't need to shout; it can whisper quietly and still leave a lasting impression.
Every product under Bonheur is crafted to reflect balance, comfort and character, simplicity and presence, functionality and finesse. As lifestyles evolve, so do we. Bonheur is designed to expand into multiple categories, creating a comprehensive ecosystem of premium essentials that complement modern living. From daily-use accessories to refined lifestyle additions, we aim to create pieces that feel personal, practical, and beautifully understated.
Our philosophy is simple: Great design is not seen. It is felt. And it's the smallest details that often make the biggest difference.
Bonheur stands for subtle confidence, curated living, and meaningful choices for people who don't just use products, but connect with them.
Bonheur - Celebrate Your Spark`
  };

  // Get brand story (use database story if available, otherwise use mapped story)
  const getBrandStory = (brand) => {
    // Get brand identifiers
    const brandName = (brand.name || '').toLowerCase().trim();
    const brandSlug = (brand.slug || '').toLowerCase().trim();
    const searchText = `${brandName} ${brandSlug}`.toLowerCase();
    
    // Try partial matching FIRST (most reliable for variations)
    if (searchText.includes('klenshine') || brandName.includes('klenshine') || brandSlug.includes('klenshine') || searchText.includes('klen')) {
      return brandStoriesMap['klenshine'] || '';
    }
    if (searchText.includes('japotup') || searchText.includes('japtoup') || brandName.includes('japotup') || brandSlug.includes('japotup') || searchText.includes('japot')) {
      return brandStoriesMap['japotup'] || brandStoriesMap['japtoup'] || '';
    }
    if (searchText.includes('bonheur') || brandName.includes('bonheur') || brandSlug.includes('bonheur')) {
      return brandStoriesMap['bonheur'] || '';
    }
    
    // Try matching by slug (exact match)
    if (brandSlug && brandStoriesMap[brandSlug]) {
      return brandStoriesMap[brandSlug];
    }
    
    // Try matching by name (remove spaces and special chars)
    const nameKey = brandName.replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    if (nameKey && brandStoriesMap[nameKey]) {
      return brandStoriesMap[nameKey];
    }
    
    // Check database story only if we haven't found a mapped story
    if (brand.story && brand.story.trim().length > 0) {
      return brand.story;
    }
    
    // Fallback to description
    return brand.description || '';
  };

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
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Brands' }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Brands</h1>
        <p className="text-lg text-gray-600">
          Explore our carefully curated collection of premium brands. Each brand represents quality, innovation, and style.
        </p>
      </div>

      {brands.length === 0 ? (
        <div className="card p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No brands yet</h3>
          <p className="text-gray-600">Add brands from the Admin panel to see them listed here.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {sortBrands(brandsWithCounts).map((brand, index) => {
            const story = getBrandStory(brand);
            const productCount = brand.productCount || brand.product_count || 0;
            
            // Get heading banner URL (using slider_image_url column)
            const headingBannerUrl = brand.slider_image_url || brand.sliderImageUrl || '';
            const headingBannerSrc = headingBannerUrl
              ? (String(headingBannerUrl).startsWith('http') || String(headingBannerUrl).includes('/storage/v1/object/public/'))
                ? headingBannerUrl
                : fileService.getPublicUrl('brand-heroes', headingBannerUrl)
              : '';

            return (
              <div key={brand.id || brand.slug} className="card overflow-hidden">
                {/* Brand Heading Banner */}
                {headingBannerSrc && (
                  <div className="w-full overflow-hidden" style={{ height: '200px' }}>
                    <img
                      src={headingBannerSrc}
                      alt={`${brand.name} heading banner`}
                      className="w-full h-full object-cover"
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  </div>
                )}
                
                <div className="p-6 md:p-8 lg:p-12 flex flex-col">
                    <div className="mb-8 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <FiAward className="text-primary-600" size={24} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-primary-600">
                          {brand.name}
                        </h2>
                      </div>
                    </div>
                    
                    {story && (
                      <div className="mb-8 flex-1">
                        <div className="text-gray-700 leading-relaxed">
                          {story.split('\n').map((line, idx, arr) => {
                            const trimmedLine = line.trim();
                            if (trimmedLine === '') return null;
                            
                            // Check if line starts with checkmark
                            if (trimmedLine.startsWith('✔')) {
                              return (
                                <div key={idx} className="flex items-start gap-3 py-1.5">
                                  <span className="text-primary-600 mt-0.5 text-lg flex-shrink-0">✔</span>
                                  <span className="flex-1">{trimmedLine.substring(1).trim()}</span>
                                </div>
                              );
                            }
                            
                            // First line is usually a title/subtitle (contains " - ")
                            if (idx === 0 && trimmedLine.includes(' - ')) {
                              return (
                                <p key={idx} className="text-lg font-semibold text-gray-900 mb-4">
                                  {trimmedLine}
                                </p>
                              );
                            }
                            
                            // Check if it's a heading (short line, ends with colon, or structured heading)
                            // Also catch common heading patterns like "One Brand, Every Cleaning Solution"
                            // Exclude questions (ending with ?) and sentences (ending with .)
                            const isHeading = trimmedLine.length < 100 && 
                              !trimmedLine.endsWith('?') &&
                              !trimmedLine.endsWith('.') &&
                              (trimmedLine.endsWith(':') || 
                               (!trimmedLine.includes('.') && trimmedLine.length < 60 && !trimmedLine.includes('—')) ||
                               (trimmedLine.length < 50 && !trimmedLine.includes('.')));
                            
                            if (isHeading && idx > 0) {
                              return (
                                <h3 key={idx} className="text-xl font-bold text-gray-900 mt-6 mb-3">
                                  {trimmedLine}
                                </h3>
                              );
                            }
                            
                            // Regular paragraph
                            return (
                              <p key={idx} className="text-base leading-7 mb-3">
                                {trimmedLine}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-auto pt-6">
                      <Link
                        to={`/brands/${brand.slug}`}
                        className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
                      >
                        Explore
                      </Link>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Why Shop Brands */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Here's Why You Should Shop With Us:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assurance</h3>
            <p className="text-gray-600">
              Every product is guaranteed authentic and meets the highest quality standards.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Brand Innovation</h3>
            <p className="text-gray-600">
              Access the latest innovations and exclusive collections from leading brands.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Trust & Heritage</h3>
            <p className="text-gray-600">
              Shop with confidence from brands with proven track records and loyal followings.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Brands;

