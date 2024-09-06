// ** Packages **
import { TableColumn } from "react-data-table-component";

// ** Icons **
import { DeleteIcon, EyeIconSettings } from "@/assets/Svg";
import { Attributes, IUseAttributeHeadersProps } from "../types/attribute";

const useAttributeHeaders = ({ onDelete }: IUseAttributeHeadersProps) => {
  const columns: TableColumn<Attributes>[] = [
    {
      name: "Attribute Name",
      sortable: true,
      sortField: "name",
      cell: (row: Attributes) => <div className="label_table">{row.name}</div>,
    },
    {
      name: "Attribute Value",
      cell: (row: Attributes) => (
        <div className="label_table">{row.options.map((option) => option.value).join(",")}</div>
      ),
      sortable: false,
    },
    {
      name: "View Item",
      cell: (row: Attributes) => (
        <div className="flex">
          <div className="mr-16">
            <button onClick={() => console.log(`View Clicked Id <><><> ${row?.id}`)}>
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
export default useAttributeHeaders;
