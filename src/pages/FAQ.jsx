import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQ = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const faqData = {
    'about': {
      title: 'ABOUT THE COMPANY',
      questions: [
        {
          q: 'What does Catalixo Global Private Limited do?',
          a: 'Catalixo Global Private Limited is a consumer-first FMCG company delivering national-brand-equivalent quality products at accessible price points for every household. Deep consumer insights, strong execution, and a commitment to sustainable growth drives the company.'
        },
        {
          q: 'Which brands come under Catalixo Global Private Limited?',
          a: 'The company plans to offer a growing portfolio of essentials under trusted brands like KlenShine, Japotup, and Bonheur, catering to diverse consumer needs across home care, pooja needs, and lifestyle accessories, with more brands and categories ready to be explored in the future.'
        },
        {
          q: 'Where is Catalixo Global Private Limited based?',
          a: 'Headquartered in Gurugram, Haryana, with supply networks expanding across geographies.'
        },
        {
          q: 'What is your long-term vision?',
          a: 'Our vision is to proudly build Indian brands that enrich everyone through high-quality yet affordable products across categories and make them accessible across the globe.'
        }
      ]
    },
    'products': {
      title: 'PRODUCTS & SAFETY',
      questions: [
        {
          q: 'Are your products safe for everyday home use?',
          a: 'Yes. We follow safety-first guidelines across all categories. Brand-specific details are available on every product. (Note: Check Labels for product-specific safety guidelines)'
        },
        {
          q: 'Are your products suitable for homes with kids and pets?',
          a: 'Yes, but product usage should always be guided by specific guidance & cautions as specified on the labels.'
        },
        {
          q: 'Do your products contain harsh chemicals?',
          a: 'Our products follow standard safety norms. Specific chemical disclosure varies by category. For full clarity, consumers are advised to check the labels behind every product.'
        }
      ]
    },
    'purchasing': {
      title: 'PURCHASING & AVAILABILITY',
      questions: [
        {
          q: 'Where can I buy your products?',
          a: 'We are expanding our product range on our website and on leading e-commerce platforms, Amazon, Flipkart, Snapdeal, Meesho, Myntra and select offline markets.'
        },
        {
          q: 'Where do you deliver?',
          a: 'Pan-India delivery via online marketplaces. Offline distribution is expanding region-wise.'
        }
      ]
    },
    'business': {
      title: 'BUSINESS & PARTNERSHIPS',
      questions: [
        {
          q: 'Are you open to distribution or business collaborations?',
          a: 'Yes, we welcome partnerships across B2B, wholesale, export, private label, and modern trade. Kindly Whatsapp at - Mr. Rishi Chandola (Business Head) +91 9997029629, +91 8287212285'
        },
        {
          q: 'Can I collaborate or manufacture with you under my brand?',
          a: 'Yes, we fulfill Private Brands requirements. Kindly Whatsapp at - Mr. Rishi Chandola (Business Head) +91 9997029629, +91 8287212285'
        }
      ]
    },
    'contact': {
      title: 'CONTACT & SUPPORT',
      questions: [
        {
          q: 'How can I reach the Catalixo Global team?',
          a: 'You can reach us at support@catalixoglobal.com or via the Contact Us page.'
        }
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Breadcrumb items={[{ label: 'FAQ' }]} />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about Catalixo Global and our products
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(faqData).map(([key, section]) => (
            <div key={key} className="border-b border-gray-200 pb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
              <div className="space-y-4">
                {section.questions.map((item, index) => {
                  const questionKey = `${key}-${index}`;
                  const isOpen = openSections[questionKey];
                  
                  return (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => toggleSection(questionKey)}
                        className="w-full text-left p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                        {isOpen ? (
                          <FiChevronUp className="flex-shrink-0 text-primary-600" size={20} />
                        ) : (
                          <FiChevronDown className="flex-shrink-0 text-gray-400" size={20} />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 md:px-6 pb-4 md:pb-6">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary-50 rounded-xl p-6 md:p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-700 mb-4">Can't find the answer you're looking for? Please reach out to our friendly team.</p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

