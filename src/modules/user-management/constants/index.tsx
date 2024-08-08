export const userHeaders = [
  {
    name: "Username",
    id: "full_name",
    sortField: "full_name",
    sortable: true,
    selector: (row: any) => <div>{row.full_name}</div>,
  },
  {
    name: "Email",
    id: "email",
    sortField: "email",
    sortable: true,
    selector: (row: any) => row.email,
  },
];
