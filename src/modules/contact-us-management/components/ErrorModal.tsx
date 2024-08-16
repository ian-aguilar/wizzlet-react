import { DeleteModalIcon } from "@/assets/Svg";
import { BaseModal } from "@/components/common/baseModal";
import { btnShowType, errorModalProps } from "@/components/form-fields/types";

export const ErrorModal: React.FC<errorModalProps> = ({ onClose, onSave, isLoading }) => {
  return (
    <BaseModal
      showType={btnShowType.red}
      cancelButtonText="Cancel"
      confirmButtonText="Delete"
      heading="Are you sure?"
      subText="This will delete this contactus request from the list"
      onCancel={onClose}
      onConfirm={onSave}
      isLoading={isLoading}
      icon={<DeleteModalIcon className="w-16 h-16 text-redAlert mx-auto " />}
    />
  );
};
