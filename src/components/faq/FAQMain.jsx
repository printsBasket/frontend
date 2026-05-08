import React from "react";
import FAQContent from "./FAQContent";
import SEO from '../common/SEO';

const FAQMain = () => {
  return (
    <>
      <SEO
          title="FAQ"
          description="Frequently asked questions about PrintsBasket printers, shipping, returns, and more. Find answers to common queries."
          canonical="/faq"
      />
      <FAQContent />
    </>
  );
};

export default FAQMain;
