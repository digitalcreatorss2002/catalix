import Breadcrumb from '../components/Breadcrumb';

const Returns = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Return Policy' }]} />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Return Policy
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Overview</h2>
            <p className="text-gray-700 mb-4">
              If a product arrives damaged or a wrong item is received, in that case, we'll make sure it's resolved quickly. E-mail us at support@catalixoglobal.com within 24 hours of delivery.
            </p>
            <p className="text-gray-700 mb-4">
              On sharing Your Order Details (Invoice Number, Date, Amount, Product Specifications) with Clear Photos and Video of the damaged/wrong product we will either replace the affected unit or issue a refund, depending on what the situation is.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
              <p className="text-gray-700 font-semibold">
                Kindly note that we do not accept returns or exchange requests, and return pickups are not possible.
              </p>
            </div>
            <p className="text-gray-700">
              Once received, our team will verify the details and take care of the rest.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Do If You Receive a Damaged or Wrong Item</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li><strong>Contact Us Immediately:</strong> Email us at support@catalixoglobal.com within 24 hours of delivery.</li>
              <li><strong>Provide Order Details:</strong> Include the following information:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>Invoice Number</li>
                  <li>Order Date</li>
                  <li>Order Amount</li>
                  <li>Product Specifications</li>
                </ul>
              </li>
              <li><strong>Provide Evidence:</strong> Send clear photos and videos of the damaged/wrong product.</li>
              <li><strong>Wait for Resolution:</strong> Our team will verify the details and process a replacement or refund as appropriate.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Resolution Timeline</h2>
            <p className="text-gray-700 mb-4">
              Once we receive your complaint with all required details:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>We will acknowledge your complaint within 24-48 hours</li>
              <li>Our team will verify the details within 2-3 business days</li>
              <li>Replacement or refund will be processed within 5-7 business days after verification</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notes</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Complaints must be reported within 24 hours of delivery</li>
              <li>Clear photographic/video evidence is mandatory</li>
              <li>Products must be unused and in original packaging (for damaged items, we understand this may not always be possible)</li>
              <li>We do not accept returns for change of mind or buyer's remorse</li>
              <li>Return pickups are not available - replacements/refunds will be processed directly</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-2">
              For return-related queries or to report an issue:
            </p>
            <ul className="list-none space-y-1 text-gray-700">
              <li>Email: support@catalixoglobal.com</li>
              <li>Phone/WhatsApp: 1800-309-8693 ; +91 9773884002</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Returns;

