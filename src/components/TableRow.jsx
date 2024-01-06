function TableRow({ entry, handleRemoveEntry }) {
  return (
    <tr>
      <td className="text-center">{entry.name}</td>
      <td className="text-center">{entry.lastName}</td>
      <td className="text-center">{entry.dateOfBirth}</td>
      <td className="text-center">{entry.description}</td>
      <td className="text-center">
        <button
          className="hover:font-bold"
          onClick={() => handleRemoveEntry(entry)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
