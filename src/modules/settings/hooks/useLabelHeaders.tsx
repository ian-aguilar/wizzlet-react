// ** Packages **
import { TableColumn } from "react-data-table-component";

// ** Types **
import { Label } from "../types/label";
import { IUseLabelHeadersProps } from "../types/label";

// ** Icons **
import { DeleteIcon, EyeIconSettings } from "@/assets/Svg";

const useLabelHeaders = ({ onDelete }: IUseLabelHeadersProps) => {
  const columns: TableColumn<Label>[] = [
    {
      name: "Name",
      sortable: true,
      sortField: "name",
      cell: (row: Label) => <div className="label_table">{row.name}</div>,
    },
    {
      name: "Items with the label",
      selector: () => "0",
      sortable: false,
    },
    {
      name: "View Item",
      cell: (row: Label) => (
        <div className="flex">
          <div className="mr-16">
            <button
              onClick={() => console.log(`View Clicked Id <><><> ${row?.id}`)}
            >
              <EyeIconSettings className="text-greenPrimary hover:brightness-125 " />
            </button>
          </div>
          <div>
            <button onClick={() => onDelete(row)}>
              <DeleteIcon className="text-redAlert  hover:brightness-125" />
            </button>
          </div>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  return { columns };
};
export default useLabelHeaders;
