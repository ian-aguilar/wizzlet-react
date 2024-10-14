import AmazonForm from "@/modules/amazon-form";
import EbayForm from "@/modules/eBay-form";

export const steps = [
  { id: 1, label: "Hayowl Form", description: "Fill Hayowl form details." },
  { id: 2, label: "Choose Marketplace", description: "Select Marketplace" },
];

export const formComponentMap: Record<string, React.ComponentType<any>> = {
  Amazon: AmazonForm,
  Ebay: EbayForm,
};
