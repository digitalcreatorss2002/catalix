import Breadcrumb from '../components/Breadcrumb';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={[{ label: 'About Us' }]} />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            About Catalixo Global Private Limited
          </h1>
          <p className="text-xl md:text-2xl text-primary-600 font-semibold">
            
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Catalixo Global Private Limited is a Consumer First FMCG company built with one purpose to delight our consumers by improving their everyday living through products and brands that people trust, rely on, and grow with. We operate in high-utility categories offering high quality products at great value.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8">Our Growing Portfolio</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-8">
            <li><strong>KlenShine</strong> – Home Care Essentials</li>
            <li><strong>Japotup</strong> – Pooja Needs</li>
            <li><strong>Bonheur</strong> – Lifestyle Accessories</li>
          </ul>

          <p className="text-xl font-semibold text-gray-900 italic mb-6 text-center">
            Rooted in India. Built for the World.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            We believe Indian brands can compete at global standards without losing their identity or affordability. Catalixo Global brings together local manufacturing, disciplined processes, and data-led consumer insights to build scalable FMCG solutions for India first and the world next.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Every brand is structured to expand across categories, deepen utility, and create long-term value for consumers, channel partners, suppliers, and key accounts alike.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          <div className="bg-primary-50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To be a trusted name in home essentials empowering consumers and partners with reliable, high-quality products across multiple categories. Through process excellence and consumer understanding, we aim to become the preferred Indian alternative in markets currently led by global brands.
            </p>
          </div>
          <div className="bg-primary-50 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To make trusted, high-quality home essentials accessible to every household. We aspire to bridge the gap between affordability and reliability, proudly building Indian brands that enrich everyday living through trust, quality, and value.
            </p>
          </div>
        </div>

        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl font-semibold text-primary-600 mb-4">
            Global in Ambition. Proudly Indian at heart.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            Catalixo Global - Quality Products, Great Value
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <div className="bg-primary-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Trust & Quality</h3>
            <p className="text-sm md:text-base text-gray-600">We build brands that consumers rely on every time.</p>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <div className="bg-primary-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Consumer Understanding</h3>
            <p className="text-sm md:text-base text-gray-600">Each category grows from deep insights, catering to everyday needs.</p>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <div className="bg-primary-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Built to Grow</h3>
            <p className="text-sm md:text-base text-gray-600">Structured to scale across products, brands, regions, and channels.</p>
          </div>

          <div className="text-center bg-white rounded-xl p-6 shadow-md">
            <div className="bg-primary-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 md:w-10 md:h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Homegrown Global Vision</h3>
            <p className="text-sm md:text-base text-gray-600">Indian at heart, Global in ambition.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

