import { Link } from 'react-router-dom';

const BrandCard = ({ brand }) => {
  const logoSrc = brand.logo || brand.logo_url || brand.image_url || brand.logoUrl;
  const productCount = brand.productCount || brand.product_count || brand.products_count || 0;
  return (
    <Link
      to={`/brands/${brand.slug}`}
      className="card group hover:shadow-lg transition-all duration-300 active:scale-95 flex flex-col h-full"
    >
      <div className="p-4 md:p-6 lg:p-8 flex flex-col items-center text-center min-h-[280px] md:min-h-[320px]">
        <div className="mb-3 md:mb-4 flex items-center justify-center" style={{ width: '227px', height: '128px', maxWidth: '100%' }}>
          <img
            src={logoSrc}
            alt={brand.name}
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            style={{ width: '227px', height: '128px', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
        <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-primary-600 transition-colors min-h-[56px] flex items-center">
          {brand.name}
        </h3>
        <div className="flex-grow flex flex-col justify-center">
          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-4 line-clamp-2 hidden sm:block min-h-[40px]">
            {brand.description}
          </p>
        </div>
        <div className="text-xs md:text-sm text-gray-500 font-medium mt-auto">
          {productCount} Products
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;

