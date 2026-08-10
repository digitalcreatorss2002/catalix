import Breadcrumb from '../components/Breadcrumb';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500">
            Last Updated: [DD/MM/YYYY]
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Catalixo Global Private Limited ("we", "our", "us", "company") is committed to protecting your privacy. This Privacy Policy applies to all brands owned by Catalixo Global Private Limited, i.e., KlenShine, Japotup, and Bonheur. By this, we explain how we collect, use, store, and safeguard your personal information when you interact with our website, products, and services.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We may collect the following types of data when you browse, purchase, or interact with us:
            </p>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">A. Information You Provide:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Name, email, phone number, address.</li>
                <li>Order details & delivery information.</li>
                <li>Queries or feedback through customer support.</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">B. Information Collected Automatically:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Device and browser details.</li>
                <li>IP address and location approximation.</li>
                <li>Pages visited and time spent on site.</li>
                <li>Cookies & tracking information.</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">C. Optional / Additional Information (only if voluntarily shared)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Product preferences.</li>
                <li>Reviews or ratings.</li>
                <li>Survey responses.</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              Your data is used only to improve your experience and to provide our services seamlessly:
            </p>
            
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">Purpose</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Order Processing</td>
                    <td className="border border-gray-300 px-4 py-2">Delivery, tracking, updates</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Customer Support</td>
                    <td className="border border-gray-300 px-4 py-2">Responding to queries</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Personalisation</td>
                    <td className="border border-gray-300 px-4 py-2">Relevant product suggestions</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Legal Compliance</td>
                    <td className="border border-gray-300 px-4 py-2">Invoice & tax documentation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">Communication</td>
                    <td className="border border-gray-300 px-4 py-2">Offers, promotions & updates*</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 italic">
              *Marketing emails/messages are sent only with your consent. You can opt out anytime.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sharing of Information</h2>
            <p className="text-gray-700 mb-4">
              We do not sell or trade your personal information.
            </p>
            <p className="text-gray-700 mb-4">
              We only share details with trusted third-party partners strictly for service purposes, such as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Logistics & courier services</li>
              <li>Payment gateways</li>
              <li>Website analytics tools</li>
              <li>Customer support services</li>
            </ul>
            <p className="text-gray-700">
              These partners are bound by confidentiality and data protection rules.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We use industry-grade safety protocols to protect your data, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Encrypted payment gateways.</li>
              <li>Secure servers.</li>
              <li>Limited internal access.</li>
              <li>Regular security checks.</li>
            </ul>
            <p className="text-gray-700">
              However, no system is 100% secure, we ensure highest possible safety practices at all times.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Request access to your data.</li>
              <li>Correct inaccurate details.</li>
              <li>Ask for deletion of stored data*</li>
              <li>Opt-out of marketing communication.</li>
            </ul>
            <p className="text-sm text-gray-600 italic mb-4">
              *Some data may need to be retained for legal/business reasons (e.g., invoicing, tax compliance).
            </p>
            <p className="text-gray-700">
              To exercise your rights, contact us at support@catalixoglobal.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies & Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies to enhance your browsing experience. They help us remember your preferences, improve speed, and show relevant suggestions.
            </p>
            <p className="text-gray-700 mb-4">
              You can disable cookies via your browser settings but some features may not work as intended.
            </p>
            <p className="text-gray-700">
              A detailed Cookie Policy will be available separately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
            <p className="text-gray-700">
              Our website may contain links to external websites. We are not responsible for their privacy policies or practices. We recommend reviewing their policies before sharing any information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700">
              We do not knowingly collect data from individuals under 13 years of age. If such data is discovered, we will delete it immediately upon notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. Any major changes will be clearly communicated on this page with the Last Updated date revised.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              For questions, feedback, or data-related requests, reach out to us at:
            </p>
            <p className="text-gray-700 mt-2">
              support@catalixoglobal.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

