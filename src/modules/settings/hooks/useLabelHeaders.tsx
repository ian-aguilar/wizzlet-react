// ** Packages **
import { TableColumn } from "react-data-table-component";

// ** Types **
import { Label } from "../types/label";
import { IUseLabelHeadersProps } from "../types/label";

// ** Icons **
import { DeleteIcon, EyeIconSettings } from "@/assets/Svg";
import { useNavigate } from "react-router-dom";

const useLabelHeaders = ({ onDelete }: IUseLabelHeadersProps) => {
  const navigate = useNavigate();
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
      cell: (row: Label) => (
        <div className="text-gray-500 font-jost font-medium text-lg m-4">
          {row.productTagCount}
        </div>
      ),
      sortable: false,
    },
    {
      name: "View Item",
      cell: (row: Label) => (
        <div className="flex">
          <div className="mr-16">
            <button
              onClick={() => {
                navigate(`/setting/label-manager/view-label/${row?.id}`);
              }}
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
