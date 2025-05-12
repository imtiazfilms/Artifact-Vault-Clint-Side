import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqs = [
    {
      question: "What is an artifact?",
      answer:
        "An artifact is any object made or modified by humans that holds historical, cultural, or educational significance.",
    },
    {
      question: "How do I add an artifact to the collection?",
      answer:
        "To add an artifact, simply sign in and go to the 'Add Artifact' section where you can upload your artifact details and images.",
    },
    {
      question: "Can I view the artifact details after liking it?",
      answer:
        "Yes! Once you like an artifact, you can still view its details by clicking on the 'View Details' button on the artifact card.",
    },
    {
      question: "Is it possible to remove an artifact once added?",
      answer:
        "Yes, you can edit or delete any artifact you've added from your account page.",
    },
    {
      question: "How can I contact support?",
      answer:
        "If you need support, you can contact us through the 'Contact Us' page or reach us via email at support@artifacttracker.com.",
    },
  ];

  return (
    <div className="faq-container mt-10 p-6 rounded-lg shadow-md w-[90%] mx-auto">
      <h2 className="text-3xl font-bold text-center text-base-content	 mb-6">Frequently Asked Questions</h2>
      <div className="faq-list space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className="w-full text-left text-xl font-semibold text-base-content	 py-3 px-4 bg-black/10 rounded-md hover:bg-gray-200 transition-all duration-200"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <div className="mt-2 px-4 pb-4 text-base-content">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
