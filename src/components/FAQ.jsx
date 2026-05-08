import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is the return policy?",
            answer:
                "You can return most new, unopened items within 30 days of delivery for a full refund. If the item is opened or used, we offer exchanges or store credit. Please ensure the item is returned in its original packaging with all accessories included. Some items are non-returnable, such as perishable goods and customized products.",
        },
        {
            question: "How do I track my order?",
            answer:
                "You can track your order through the 'Track Order' page using your unique order ID. After your purchase, you'll receive an email with tracking details. Additionally, you can log into your account and view your order status. Tracking updates will be provided at each stage of shipping, from the warehouse to delivery at your doorstep.",
        },
        {
            question: "Do you offer international shipping?",
            answer:
                "Currently, we only offer domestic shipping within the United States. However, we are working on expanding our international shipping options. We will notify you as soon as international shipping becomes available. Please check the shipping section at checkout to see if your country is supported for shipping.",
        },
        {
            question: "How can I contact customer support?",
            answer:
                "You can reach our customer support team via live chat, email, or phone. To contact us through email, please visit the 'Contact Us' page for details. Our support team is available 24/7 to assist you with any issues or questions you may have regarding your orders, products, or our services.",
        },
        {
            question: "What payment methods do you accept?",
            answer:
                "We accept all major credit cards, including Visa, MasterCard, American Express, and Discover. In addition to credit cards, we also support PayPal, Apple Pay, and Google Pay for easy and secure transactions. If you experience any issues during payment, please contact our customer support for assistance.",
        },
        {
            question: "Can I change my order after placing it?",
            answer:
                "Once an order is placed, we begin processing it immediately. Therefore, we cannot guarantee changes to your order after it has been confirmed. However, if you need to make a change, please reach out to customer support as soon as possible. If the order is still in processing, we may be able to make adjustments. Once shipped, changes are no longer possible.",
        },
        {
            question: "How do I apply a discount code?",
            answer:
                "To apply a discount code, go to the checkout page before completing your purchase. You will find a box labeled 'Promo Code' where you can enter the code. After entering the code, click 'Apply' to see the discount reflected in your order total. Please note that some codes have specific terms and conditions, so read the details carefully.",
        },
        {
            question: "Are the products on the website authentic?",
            answer:
                "Yes, all the products sold on our website are 100% authentic and sourced from reputable manufacturers and authorized distributors. We guarantee the quality and authenticity of every item. If you have concerns about product authenticity, please don't hesitate to contact us for further clarification.",
        },
    ];

    return (
        <div className="max-w-3xl mx-auto p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Frequently Asked Questions</h1>

            <div className="space-y-3 sm:space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b last:border-none">
                        <div
                            onClick={() => toggleAnswer(index)}
                            className="flex justify-between items-center py-4 cursor-pointer"
                        >
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">{faq.question}</h2>
                            <span className="text-indigo-600">
                                {activeIndex === index ? (
                                    <FaChevronUp className="w-5 h-5" />
                                ) : (
                                    <FaChevronDown className="w-5 h-5" />
                                )}
                            </span>
                        </div>
                        {activeIndex === index && (
                            <div className="pb-4 text-gray-600 text-sm">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
