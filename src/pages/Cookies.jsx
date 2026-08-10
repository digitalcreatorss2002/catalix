import Breadcrumb from '../components/Breadcrumb';

const Cookies = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Cookie Policy' }]} />
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-sm text-gray-500">
            Last Updated: [DD/MM/YYYY]
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Catalixo Global Private Limited ("we", "our", "us") uses cookies and similar tracking technologies to enhance your browsing experience on our website. This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookies.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 mb-4">
              Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
            <p className="text-gray-700 mb-4">We use cookies for the following purposes:</p>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Essential Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Performance Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the website's performance.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Functionality Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced, personalized features.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketing Cookies</h3>
              <p className="text-gray-700 mb-2">
                These cookies are used to deliver advertisements relevant to you and your interests. They also help measure the effectiveness of advertising campaigns.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Cookies</h2>
            <p className="text-gray-700 mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed.
            </p>
            <p className="text-gray-700 mb-4">
              However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
            </p>
            <p className="text-gray-700">
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit www.aboutcookies.org or www.allaboutcookies.org.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 mb-4">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements, and so on.
            </p>
            <p className="text-gray-700">
              These third parties may set their own cookies on your device. We do not control these cookies, so please refer to their respective privacy policies for more information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Cookie Policy</h2>
            <p className="text-gray-700">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business operations. We will notify you of any material changes by posting the new Cookie Policy on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our use of cookies, please contact us at:
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

export default Cookies;

