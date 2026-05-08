import React from "react";
import { TruckIcon, ArrowPathIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const FeaturesSection = () => {
    const features = [
        {
            icon: TruckIcon,
            title: "Free Shipping",
            description: "Enjoy free shipping on all orders over $150",
        },
        {
            icon: ArrowPathIcon,
            title: "Easy Returns",
            description: "Hassle-free returns for a worry-free shopping experience.",
        },
        {
            icon: ChatBubbleBottomCenterTextIcon,
            title: "24/7 Support",
            description: "We're here for you anytime with 24/7 customer support.",
        },
    ];

    return (
        <section className="bg-gray-50 py-8 sm:py-10 lg:py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
                            <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
