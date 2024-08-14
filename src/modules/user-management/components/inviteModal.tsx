// WarningModal.tsx
import React from "react";
import {
  btnShowType,
  inviteModalProps,
} from "../../../components/form-fields/types";
import { BaseModal } from "../../../components/common/baseModal";
import { RightIcon } from "@/assets/Svg";

const InviteModal: React.FC<inviteModalProps> = ({ onClose, link }) => {
  const handleCopy = () => {
    if (link) {
      navigator.clipboard.writeText(link);
    }
  };

  return (
    <BaseModal
      cancelButtonText="Cancel"
      confirmButtonText="Invite"
      heading="New User Created"
      subText="New user created successfully"
      keyWord="Invite link"
      onCancel={onClose}
      icon={<RightIcon className="w-16 h-16 text-redAlert mx-auto " />}
      showType={btnShowType.green}>
      <div className="flex cursor-pointer">
        <input
          value={link ? link : ""}
          type="text"
          className="bg-inputAuthBg/60 p-3 rounded-md text-gray-800 w-full outline-none hover:outline-greenPrimary  focus:outline-greenPrimary font-normal text-base mb-1 transition-all duration-300"
          disabled={true}
        />
        <span className="pl-2 mt-3" onClick={handleCopy}>
          COPY
        </span>
      </div>
    </BaseModal>
  );
};

export default InviteModal;
