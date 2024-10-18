// ** types **
import { PrivateRoutesPath } from "@/modules/Auth/types";

import {
  CMSMGTIcon,
  DashboardIcon,
  MarketPlaceIcon,
  SettingsIcon,
  UserMgtIcon,
} from "@/assets/Svg";

import VisionImg from "/images/VisionImg.png";
import MissionImg from "/images/MissionImg.png";
import { ICard } from "@/modules/Admin/Aboutus/types";
import { sidebarList } from "@/components/sidebar/types";

export const navData = [
  {
    navIcon: DashboardIcon,
    navName: "Dashboard",
    navClass: "bg-greenPrimary text-white",
    path: PrivateRoutesPath.dashboard.view,
    key: sidebarList.dashboard,
  },
  {
    navIcon: UserMgtIcon,
    navName: "User Management",
    path: PrivateRoutesPath.userManagement.view,
    key: sidebarList.user,
  },
  {
    navIcon: MarketPlaceIcon,
    navName: "Marketplace",
    path: PrivateRoutesPath.marketplace.view,
    key: sidebarList.marketplace,
  },
  {
    navIcon: CMSMGTIcon,
    navName: "CMS Management",
    path: "",
    key: sidebarList.cms,
  },
  {
    navIcon: SettingsIcon,
    navName: "Settings",
    path: PrivateRoutesPath.setting.profile.view,
    key: sidebarList.setting,
  },
];

export const aboutData = {
  topSection: {
    heading: "Who we are?",
    description: `"We are a passionate team of technology enthusiasts, industry experts, and business professionals dedicated to transforming the way businesses manage their inventory. With years of experience in the field, we understand the complexities and challenges of inventory management. Our goal is to provide innovative solutions that empower businesses to operate more efficiently, reduce costs, and improve overall productivity."`,
    greenButton: "Sign Up Now ",
    whiteButton: "",
    cards: [
      {
        src: "../images/IconService.png",
        h3: "Real-Time Inventory Tracking",
        p: "We are a team of seasoned professionals with deep expertise in inventory management, dedicated to delivering innovative solutions.",
      },
      {
        src: "../images/IconService.png",
        h3: "Real-Time Inventory Tracking",
        p: "Monitor your inventory in real-time across all locations, ensuring accurate stock levels and reducing the risk of stockouts or overstocking.",
      },
      {
        src: "../images/IconService.png",
        h3: "Real-Time Inventory Tracking",
        p: "Monitor your inventory in real-time across all locations, ensuring accurate stock levels and reducing the risk of stockouts or overstocking.",
      },
      {
        src: "../images/IconService.png",
        h3: "Real-Time Inventory Tracking",
        p: "Monitor your inventory in real-time across all locations, ensuring accurate stock levels and reducing the risk of stockouts or overstocking.",
      },
    ],
  },
  visionSection: {
    title: "Our Vision",
    description:
      "Our vision is to become the leading provider of intelligent inventory management solutions worldwide. We aim to revolutionize the way handle their inventory by leveraging cutting-edge technology, automation, and real-time data. We envision a future where every business, regardless of size, has the tools and insights needed to optimize their inventory processes and achieve sustainable growth.",
    greenButton: "Try For Free",
    image: VisionImg,
  },
  missionSection: {
    title: "Our Mission",
    description:
      "Our mission is to simplify inventory management for businesses of all sizes. We strive to create user-friendly, powerful, and scalable solutions that address the unique needs of our customers. By continuously innovating and improving our offerings, we aim to help businesses reduce inefficiencies, enhance visibility, and make smarter inventory decisions.",
    image: MissionImg,
  },
  serviceSection: {
    title: "What we provide?",
    description: `"Our vision is to become the leading provider of intelligent inventory management solutions worldwide. We aim to revolutionize the way businesses handle their inventory by leveraging cutting-edge technology, automation, and real-time data. We envision a future where every business, regardless of size, has the tools and insights needed to optimize their inventory processes and achieve sustainable growth."`,
    cards: [
      {
        src: "../images/IconService.png",
        h3: "Real-Time Inventory Tracking",
        p: "Monitor your inventory in real-time across all locations, ensuring accurate stock levels and reducing the risk of stockouts or overstocking.",
      },
      {
        src: "../images/IconService.png",
        h3: "Real-Time Inventory Tracking",
        p: "Monitor your inventory in real-time across all locations, ensuring accurate stock levels and reducing the risk of stockouts or overstocking.",
      },
      {
        src: "../images/IconService.png",
        h3: "Real-Time Inventory Tracking",
        p: "Monitor your inventory in real-time across all locations, ensuring accurate stock levels and reducing the risk of stockouts or overstocking.",
      },
      {
        src: "../images/IconService.png",
        h3: "Real-Time Inventory Tracking",
        p: "Monitor your inventory in real-time across all locations, ensuring accurate stock levels and reducing the risk of stockouts or overstocking.",
      },
      {
        src: "../images/IconService.png",
        h3: "Real-Time Inventory Tracking",
        p: "Monitor your inventory in real-time across all locations, ensuring accurate stock levels and reducing the risk of stockouts or overstocking.",
      },
      {
        src: "../images/IconService.png",
        h3: "Real-Time Inventory Tracking Tracking Tracking",
        p: "Monitor your inventory in real-time across all locations, ensuring accurate stock levels and reducing the risk of stockouts or overstocking stockouts or overstocking stockouts or overstocking.",
      },
    ],
  },
};

export enum NOTIFICATION_TYPE {
  SOLD = "SOLD",
  LIST = "LIST",
  OUT_OF_STOKE = "OUT_OF_STOKE",
  LOW_STOKE = "LOW_STOKE",
}

export enum Type {
  NOTIFICATION = "NOTIFICATION",
  ALERT = "ALERT",
}

export const FaqData = {
  topSection: {
    title: "Frequently asked questions",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    row: [
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
    ],
  },
  bottomSection: {
    title: "Take Control of Your Inventory Today",
    description:
      "Experience the efficiency and precision of our inventory management solution. Join thousands of satisfied customers who have transformed their business operations with our intuitive, powerful, and integrated system.",
    greenButton: "Get Importme free",
    whiteButton: "Book a demo",
  },
};

export const ContactData = {
  title: "Let’s Get In Touch",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  greenButton: "Send",
};
export const FaqDataQuestionAnswer = [
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

export const profileDefaultValue = {
  firstName: "",
  lastName: "",
  organizationName: "",
  contactNumber: 0,
  email: "",
};

export enum ATTACHMENT_FILE_TYPES {
  PNG = "image/png",
  JPG = "image/jpg",
  JPEG = "image/jpeg",
  GIF = "image/gif",
  MP3 = "audio/mp3",
  OGG = "audio/ogg",
  MPEG = "audio/mpeg",
  MP4 = "video/mp4",
  WEBM = "video/webm",
  OGG_VIDEO = "video/ogg",
  PLAIN_TEXT = "text/plain",
  PDF = "application/pdf",
  XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  XLS = "application/vnd.ms-excel",
  XLSM = "application/vnd.ms-excel.sheet.macroEnabled.12",
  DOC = "application/msword",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
export const aboutusCardDefaultValue: ICard = {
  icon: "",
  title: "",
  description: "",
};

// Quill modules configuration
export const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    [{ list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};
