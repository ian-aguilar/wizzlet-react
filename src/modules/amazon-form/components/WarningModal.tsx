// WarningModal.tsx
import React from "react";
import {
  btnShowType,
  warningModalProps,
} from "../../../components/form-fields/types";
import { BaseModal } from "../../../components/common/baseModal";
import { InfoIcon } from "@/assets/Svg";

const VariantWarningModal: React.FC<warningModalProps> = ({
  onClose,
  onSave,
  confirmButtonText,
  heading,
  subText,
}) => {
  return (
    <BaseModal
      cancelButtonText="Cancel"
      confirmButtonText={confirmButtonText}
      heading={heading}
      subText={subText as string}
      icon={<InfoIcon className="w-16 h-16 text-redAlert mx-auto" />}
      onCancel={onClose}
      onConfirm={onSave}
      showType={btnShowType.green}
    />
  );
};

export default VariantWarningModal;
