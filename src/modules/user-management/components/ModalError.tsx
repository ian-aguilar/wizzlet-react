import {
  btnShowType,
  errorModalProps,
} from "../../../components/form-fields/types";
import { BaseModal } from "../../../components/common/baseModal";
import { DeleteModalIcon } from "@/assets/Svg";

export const ErrorModal: React.FC<errorModalProps> = ({ onClose, onSave }) => {
  return (
    <BaseModal
      showType={btnShowType.red}
      cancelButtonText="Cancel"
      confirmButtonText="Delete"
      heading="Are you sure?"
      subText="This will delete your user from the list."
      onCancel={onClose}
      onConfirm={onSave}
      icon={<DeleteModalIcon className="w-16 h-16 text-redAlert mx-auto " />}
    />
  );
};
