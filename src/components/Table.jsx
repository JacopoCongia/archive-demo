import { Fragment } from "react";

import TableRow from "./TableRow";

function Table({ entries, tableConfig, handleRemoveEntry }) {
  const tableRows = entries?.map((entry) => {
    return (
      <TableRow
        key={entry.id}
        entry={entry}
        tableConfig={tableConfig}
        handleRemoveEntry={handleRemoveEntry}
      />
    );
  });

  const tableHeaders = tableConfig.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    } else {
      return (
        <th
          key={column.label}
          className={`min-w-[50px] min-[680px]:min-w-[80px] ${
            column.responsive && "hidden min-[680px]:table-cell"
          }`}
        >
          {column.label}
        </th>
      );
    }
  });

  return (
    <table className="w-[80%]">
      <thead>
        <tr className="bg-red-800 text-white">{tableHeaders}</tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

export default Table;
