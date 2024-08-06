import React from "react";
import { Footer } from "../common/Footer";
import { Header } from "../common/Header";
import { Button } from "../common/Button";
const FaqData = [
  {
    count: "01.",
    question:
      "How does your inventory management system help reduce stock outs and overstocking? ",
    answer:
      "Our system provides real-time inventory tracking and automated reordering alerts, ensuring you maintain optimal stock levels  and avoid costly stockouts or overstocking.",
  },
  {
    count: "02.",
    question:
      "Is your inventory management system compatible with my existing tools?",
    answer:
      "Yes, our system integrates seamlessly with various e-commerce platforms, accounting software, shipping carriers, and POS systems. Check out our Integration section for a full list of compatible tools.",
  },
  {
    count: "03.",
    question: "Can I manage inventory across multiple locations?",
    answer:
      "Absolutely! Our solution supports multi-location inventory management, allowing you to monitor and manage stock levels across all your warehouses and stores from one centralized dashboard.",
  },
  {
    count: "04.",
    question: "How can I access inventory reports and analytics?",
    answer:
      "You can easily access detailed reports and analytics through our user-friendly dashboard. Customize your reports to gain insights into inventory trends, sales performance, and more, helping you make informed business decisions.",
  },
  {
    count: "05.",
    question: "What kind of support do you offer?",
    answer:
      "We offer comprehensive support, including a knowledge base, video tutorials, and 24/7 customer service via chat, email, and phone. Our dedicated support team is here to help you with any questions or issues you may encounter.",
  },
  {
    count: "06.",
    question: "How secure is my data?",
    answer:
      "Your data security is our top priority. Our system uses advanced encryption protocols and regular security audits to ensure your data is safe and protected at all times.",
  },
  {
    count: "07.",
    question: "Can I try the system before committing?",
    answer:
      "Yes, we offer a free trial so you can experience the full capabilities of our inventory management system before making a commitment. Sign up for your free trial today!",
  },
  {
    count: "08.",
    question:
      "How easy is it to set up and use your inventory management system?",
    answer:
      "Our system is designed with user-friendliness in mind. The setup process is straightforward, and our intuitive interface ensures you can start managing your inventory efficiently from day one. We also provide comprehensive onboarding support to get you up and running quickly.",
  },
  {
    count: "09.",
    question:
      "Can I customize the features of the inventory management system to suit my business needs?",
    answer:
      "Yes, our system is highly customizable. You can tailor various features and settings to align with your specific business processes and requirements. Whether it's setting custom reorder points or generating specific reports, our solution adapts to your needs.",
  },
  {
    count: "10.",
    question: "Does the system support mobile access?",
    answer:
      "Absolutely! Our inventory management system is accessible on mobile devices, allowing you to manage your inventory on the go. Whether you’re in the warehouse or out in the field, you’ll have full control at your fingertips.",
  },
  {
    count: "11.",
    question:
      "What types of businesses can benefit from your inventory management solution?",
    answer:
      "Our solution is versatile and can benefit a wide range of businesses, including retail, wholesale, manufacturing, and e-commerce. Whether you have a small business or a large enterprise, our system scales to meet your inventory management needs.",
  },
];
const Faqs = () => {
  return (
    <>
      <Header />
      <section className="bg-CMSPageTop bg-repeat-x">
        <div className="container">
          <div className="MainTitle pt-7 sm:pt-12 md:pt-24 pb-10 md:pb-20 px-8 lg:px-40 text-center">
            <h1 className=" text-5xl md:text-6xl font-bold">
              Frequently asked questions
            </h1>
            <p className=" font-normal text-xl text-grayText  px-2 sm:px-4 lg:px-40  pt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="faqWithAnswers">
            {FaqData.map((data, i) => (
              <div
                className="border-t border-b border-greyBorder py-7 mb-7 md:flex justify-between items-start"
                key={i}
              >
                <div className="flex gap-3 items-start md:w-[42%]">
                  <div className="font-bold text-greenPrimary text-[26px] min-w-9 w-9">
                    {data.count}
                  </div>
                  <div className="font-medium text-2xl text-blackPrimary">
                    {data.question}
                  </div>
                </div>
                <span className="md:w-[56%] font-normal text-grayText text-lg md:pl-0 pl-11 block">
                  {data.answer}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className=" mt-10 md:mt-40 mb-10  md:mb-24  ">
        <div className="container">
          <div className="bg-CMSPageTile rounded-2xl sm:px-10 lg:px-56  py-7 lg:py-20 text-center border border-greyBorder/50 ">
            <h2 className=" text-5xl md:text-[56px] font-bold text-blackPrimary leading-tight ">
              Take Control of Your Inventory Today
            </h2>
            <p className="  px-7 md:px-20 text-grayText text-xl font-normal pt-6 ">
              Experience the efficiency and precision of our inventory
              management solution. Join thousands of satisfied customers who
              have transformed their business operations with our intuitive,
              powerful, and integrated system.
            </p>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-center items-center pt-6 md:pt-12">
              <Button
                btnClass=" border-greenPrimary bg-greenPrimary text-white "
                btnName="Get Importme free"
              />

              <Button
                btnClass=" border-greyBorder bg-white  text-blackPrimary  "
                btnName="Book a demo"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Faqs;
