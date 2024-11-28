import { TableColumn } from "react-data-table-component";
import { IUseUserHeadersProps, IUserListing } from "../types";
import { dateFormatter } from "@/helper";
import { DeleteIcon, EyeIconSettings } from "@/assets/Svg";
import { InputSwitch } from "@/components/common/InpiutSwitch";
import { useNavigate } from "react-router-dom";

const useUserHeaders = ({ onDelete, onInactive }: IUseUserHeadersProps) => {
  const navigate = useNavigate();
  const userHeaders: TableColumn<IUserListing>[] = [
    {
      name: "Username",
      id: "full_name",
      sortField: "full_name",
      sortable: true,
      cell: (row: IUserListing) => (
        <div className="relative">
          {row.added_by_admin && (
            <span className="text-greenPrimary absolute -top-1 left-0 bg-greenPrimary/10 block whitespace-nowrap text-[10px] leading-[14px] ">
              {" "}
              Add by admin{" "}
            </span>
          )}
          <span className="block pt-1.5 "> {row.full_name}</span>
        </div>
      ),
    },
    {
      name: "Email",
      id: "email",
      sortField: "email",
      sortable: true,
      selector: (row: IUserListing) => row.email,
    },
    {
      name: "Status",
      id: "status",
      cell: (row: IUserListing) => (
        <InputSwitch id={row.id} status={row.status} onToggle={onInactive} />
      ),
    },

    {
      name: "Join Date",
      id: "join_date",
      selector: (row: IUserListing) => dateFormatter(row.created_at),
    },
    {
      name: "Last Active",
      id: "last_active",
      selector: (row: IUserListing) =>
        dateFormatter(row.last_active_date, true),
    },
    {
      name: "Action",
      id: "action",
      cell: (row: IUserListing) => (
        <div className="flex gap-4 ">
          <span
            className="text-greenPrimary cursor-pointer"
            onClick={() => navigate(`/user-management/view/${row.id}`)}
          >
            {" "}
            <EyeIconSettings className="inline-block mr-1 text-greenPrimary" />{" "}
            view
          </span>
          <span
            className="text-redAlert cursor-pointer"
            onClick={() => onDelete(row.id)}
          >
            {" "}
            <DeleteIcon className="inline-block mr-1 text-redAlert" /> delete
          </span>
        </div>
      ),
    },
  ];

  return { userHeaders };
};
export default useUserHeaders;
