import { TableColumn } from "react-data-table-component";

import { IContactUsListing, IUseContactusHeadersProps } from "../types";
import { DeleteIcon } from "@/assets/Svg";

const useContactusHeaders = ({ onDelete }: IUseContactusHeadersProps) => {
  const contactusHeader: TableColumn<IContactUsListing>[] = [
    {
      name: "Full Name",
      id: "full_name",
      sortField: "full_name",
      sortable: true,
      selector: (row: IContactUsListing) => row.first_name + " " + row.last_name,
    },
    {
      name: "Email",
      id: "email",
      sortField: "email",
      sortable: true,
      selector: (row: IContactUsListing) => row.email,
    },
    {
      name: "Phone Number",
      id: "phoneNumber",
      sortField: "phone_number",
      sortable: true,
      selector: (row: IContactUsListing) => (row.phone_number ? row.phone_number : "-"),
    },
    {
      name: "Company Name",
      id: "companyName",
      sortField: "company_name",
      sortable: true,
      cell: (row: IContactUsListing) => <div>{row.company_name ? row.company_name : "-"}</div>,
    },
    {
      name: "Message",
      id: "message",
      cell: (row: IContactUsListing) => <div>{row.message ? row.message : "-"}</div>,
    },
    {
      name: "Action",
      id: "action",
      cell: (row: IContactUsListing) => (
        <div className="flex gap-4 ">
          <span className="text-redAlert cursor-pointer" onClick={() => onDelete(row.id)}>
            {" "}
            <DeleteIcon className="inline-block mr-1 text-redAlert" /> delete
          </span>
        </div>
      ),
    },
  ];

  return { contactusHeader };
};

export default useContactusHeaders;
