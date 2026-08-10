import Breadcrumb from '../components/Breadcrumb';

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Terms of Service' }]} />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500">
            Effective Date: [Date] | Last Updated: [Date]
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to Catalixo Global Private Limited ("we", "our", "us", "company") and all brands owned by Catalixo Global Private Limited, i.e., KlenShine, Japotup, and Bonheur. By accessing or using our website and services, you agree to the Terms of Service listed below. Please read them carefully before placing any order.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Catalixo Global Private Limited</h2>
            <p className="text-gray-700 mb-4">
              Catalixo Global Private Limited is an Indian FMCG offering home cleaning essentials, pooja needs, and everyday convenience products at high quality and super value for money offerings. By using our website, you acknowledge that you are at least 18 years old or using the site under parental/guardian supervision.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Website</h2>
            <p className="text-gray-700 mb-4">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Use this website only for lawful and personal purposes.</li>
              <li>Not attempt to harm the website with viruses, bots, scripts, or unauthorized access.</li>
              <li>Not misuse reviews, payment systems, or customer service channels.</li>
            </ul>
            <p className="text-gray-700">
              We reserve the right to refuse service or cancel orders if misuse is detected.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Information</h2>
            <p className="text-gray-700 mb-4">We aim to provide accurate details, images, and descriptions. However:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Colours may slightly vary due to screen settings.</li>
              <li>Packaging/Pricing may change for improvements without prior notice.</li>
              <li>Some product batches may have minor variations based on manufacturing updates.</li>
            </ul>
            <p className="text-gray-700">
              All product information is provided in good faith for our consumers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing & Payments</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Prices shown are exclusive of applicable taxes, unless stated otherwise.</li>
              <li>Final payable amount includes shipping charges (if any).</li>
              <li>Payments are processed securely through authorised payment gateways.</li>
              <li>Order confirmation is only after successful payment.</li>
              <li>In case of payment failure, the order does not stand confirmed.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping & Delivery</h2>
            <p className="text-gray-700">
              Delivery timelines depend on your location and logistics partner availability. More details are provided in our Shipping Policy section. Once the package is handed to the courier company, tracking details will be shared via email/SMS/WhatsApp.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Issues & Replacements</h2>
            <p className="text-gray-700 mb-4">
              If your order arrives damaged, leaking, or incorrect, contact us (support@catalixoglobal.com) within 24 hours of delivery along with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Order Details (Invoice Number, Date, Amount, Product Specifications)</li>
              <li>Clear photo/video of the issue</li>
            </ul>
            <p className="text-gray-700 mb-4">
              We will offer a replacement or refund for the affected unit(s).
            </p>
            <p className="text-gray-700">
              Returns or exchanges are currently not accepted, and return pickups are not possible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700">
              All logos, brand names (KlenShine, Japotup, Bonheur), content, and product designs are the intellectual property of Catalixo Global Private Limited and may not be copied, sold, or reproduced without written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">We are not responsible for:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Delays caused by courier services</li>
              <li>User-entered delivery address errors</li>
              <li>Improper product usage beyond the recommended usage instructions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Reviews & Feedback</h2>
            <p className="text-gray-700">
              By submitting reviews or feedback, you permit us to use them for marketing/promotional purposes. While critical feedback to help us improve and for the benefit of other shoppers/consumers is appreciated, abusive or misleading reviews shall be removed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Updates</h2>
            <p className="text-gray-700">
              We may update prices, policies, or terms without prior notice. Continued use of our website means you accept the updated terms. Users are advised to check Terms of Service regularly to stay updated.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data & Privacy</h2>
            <p className="text-gray-700">
              We collect personal details only to fulfil orders and improve service of our consumers. For full details, read our Privacy Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-2">For order-related issues, queries, or feedback:</p>
            <ul className="list-none space-y-1 text-gray-700">
              <li>Email: support@catalixoglobal.com</li>
              <li>Phone/WhatsApp: 1800-309-8693 ; +91 9773884002</li>
              <li>Registered Office: 716, ILD Trade Centre, Sector-47, Sohna Road, Gurgaon, Gurgaon, Gurgaon, Haryana 122018, India (GST: 06AALCC8936F1ZE)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700">
              These terms are governed by the laws of India, under the relevant Consumer Protection & IT regulations. Any disputes will fall under the jurisdiction of the courts of Gurugram, Haryana.
            </p>
          </section>

          <div className="bg-primary-50 rounded-xl p-6 mt-8">
            <p className="text-gray-700 font-semibold">
              By visiting this website or placing an order, you agree to these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

