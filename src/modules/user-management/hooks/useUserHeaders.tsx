import { TableColumn } from "react-data-table-component";
import { IUseUserHeadersProps, IUserListing } from "../types";
import { dateFormatter } from "@/helper";

const useUserHeaders = ({ onDelete, onStatusChange }: IUseUserHeadersProps) => {
  const userHeaders: TableColumn<IUserListing>[] = [
    {
      name: "Username",
      id: "full_name",
      sortField: "full_name",
      sortable: true,
      cell: (row: IUserListing) => (
        <div>
          {row.added_by_admin && <span> Added by admin </span>}
          {row.full_name}
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
        <div onClick={() => onStatusChange(row.id)}>{row.status}</div>
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
        <div>
          <span>view</span>
          <span onClick={() => onDelete(row.id)}>delete</span>
        </div>
      ),
    },
  ];

  return { userHeaders };
};
export default useUserHeaders;
