function TableRow({ entry, tableConfig }) {
  const tableCells = tableConfig.map((column) => {
    return (
      <td key={column.label} className="px-[1em] text-center">
        {column.render(entry)}
      </td>
    );
  });
  return <tr>{tableCells}</tr>;
}

export default TableRow;
