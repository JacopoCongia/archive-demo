import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";

import SearchBar from "./SearchBar";
import Table from "./Table";

function SortableTable(props) {
  const [sortOrder, setSortOrder] = useState(null);
  const [sortCriteria, setSortCriteria] = useState(null);
  const [term, setTerm] = useState("");

  const { tableConfig, entries } = props;

  function handleClick(label) {
    if (sortCriteria && label !== sortCriteria) {
      setSortOrder("asc");
      setSortCriteria(label);

      return;
    }

    if (sortOrder === null) {
      setSortOrder("asc");
      setSortCriteria(label);
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
      setSortCriteria(label);
    } else {
      setSortOrder(null);
      setSortCriteria(null);
    }
  }

  const updatedConfig = tableConfig.map((column) => {
    if (!column.sortValue) {
      return column;
    } else {
      return {
        ...column,
        header: () => (
          <th
            className="cursor-pointer hover:bg-red-700 px-[1em]"
            onClick={() => handleClick(column.label)}
          >
            <div className="flex items-center gap-[1em] justify-center">
              {column.label} {getSortIcon(column.label)}
            </div>
          </th>
        )
      };
    }
  });

  let sortedEntries = entries;

  if (term) {
    sortedEntries = entries.filter((entry) => {
      return (
        entry.name.toLowerCase().includes(term.toLowerCase()) ||
        entry.lastName.toLowerCase().includes(term.toLowerCase()) ||
        entry.city.toLowerCase().includes(term.toLowerCase())
      );
    });
  }

  if (sortOrder && sortCriteria) {
    const { sortValue } = tableConfig.find(
      (column) => column.label === sortCriteria
    );
    sortedEntries = [...entries].sort((a, b) => {
      const valueA = sortValue(a);
      const valueB = sortValue(b);

      const reverseOrder = sortOrder === "asc" ? 1 : -1;

      if (typeof valueA === "string") {
        return valueA.localeCompare(valueB) * reverseOrder;
      } else {
        return (valueA - valueB) * reverseOrder;
      }
    });
  }

  function getSortIcon(label) {
    if (label !== sortCriteria) {
      return <FaSort />;
    }
    if (sortOrder === null) {
      return <FaSort />;
    } else if (sortOrder === "asc") {
      return <FaSortUp />;
    } else if (sortOrder === "desc") {
      return <FaSortDown />;
    }
  }

  return (
    <>
      <SearchBar setTerm={setTerm} />
      <Table {...props} entries={sortedEntries} tableConfig={updatedConfig} />
    </>
  );
}

export default SortableTable;
