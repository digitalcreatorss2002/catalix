import Breadcrumb from '../components/Breadcrumb';

const Shipping = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Shipping Info' }]} />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Shipping Information
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Locations</h2>
            <p className="text-gray-700 mb-4">
              We offer Pan-India delivery via online marketplaces. Our products are available on leading e-commerce platforms including Amazon, Flipkart, Snapdeal, Meesho, Myntra, and select offline markets.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Timeline</h2>
            <p className="text-gray-700 mb-4">
              Delivery timelines depend on your location and logistics partner availability. Standard delivery times are as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Metro Cities:</strong> 2-5 business days</li>
              <li><strong>Tier 1 & Tier 2 Cities:</strong> 4-7 business days</li>
              <li><strong>Other Locations:</strong> 5-10 business days</li>
            </ul>
            <p className="text-gray-700">
              Please note that delivery times may vary during festivals, sales, or adverse weather conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Tracking</h2>
            <p className="text-gray-700 mb-4">
              Once your order is confirmed and the package is handed over to the courier company, tracking details will be shared with you via:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Email</li>
              <li>SMS</li>
              <li>WhatsApp</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Charges</h2>
            <p className="text-gray-700 mb-4">
              Shipping charges vary based on your location and the order value. Free shipping may be available on orders above a certain amount. Please check the shipping charges during checkout before confirming your order.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Address Verification</h2>
            <p className="text-gray-700 mb-4">
              Please ensure that your delivery address is complete and accurate. We are not responsible for delays or failed deliveries due to incorrect address information provided by you.
            </p>
            <p className="text-gray-700">
              If you need to update your delivery address, please contact us immediately after placing your order at support@catalixoglobal.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              For any queries related to shipping, please contact us at:
            </p>
            <ul className="list-none space-y-1 text-gray-700 mt-2">
              <li>Email: support@catalixoglobal.com</li>
              <li>Phone/WhatsApp: 1800-309-8693 ; +91 9773884002</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shipping;

