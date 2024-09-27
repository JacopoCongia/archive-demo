import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa6";

import SearchBar from "./SearchBar";
import Table from "./Table";

function SortableTable(props) {
  const { tableConfig, entries } = props;

  const [sortOrder, setSortOrder] = useState("desc");
  const [sortCriteria, setSortCriteria] = useState("Last Edited");
  const [term, setTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

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
            className={`cursor-pointer hover:bg-red-700 px-[0.5em] text-[0.7rem] ${
              column.responsive && "hidden min-[680px]:table-cell"
            }`}
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

  let paginatedEntries = entries.slice(currentPage * 10 - 10, currentPage * 10);
  let sortedEntries = entries;
  let searchedEntries = entries;

  if (term) {
    searchedEntries = entries.filter((entry) => {
      return (
        entry.name.toLowerCase().startsWith(term.toLowerCase()) ||
        entry.lastName.toLowerCase().startsWith(term.toLowerCase()) ||
        entry.city.toLowerCase().startsWith(term.toLowerCase())
      );
    });
  }

  if (term) {
    if (sortOrder && sortCriteria) {
      const { sortValue } = tableConfig.find(
        (column) => column.label === sortCriteria
      );

      sortedEntries = [...searchedEntries].sort((a, b) => {
        const valueA = sortValue(a);
        const valueB = sortValue(b);

        const reverseOrder = sortOrder === "asc" ? 1 : -1;

        if (typeof valueA === "string") {
          return valueA.localeCompare(valueB) * reverseOrder;
        } else {
          return (valueA - valueB) * reverseOrder;
        }
      });
    } else {
      sortedEntries = [...searchedEntries];
    }
  } else {
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

      {/* <div className="flex gap-2">
        <div>First</div>
        <div>{currentPage !== 1 ? currentPage - 1 : null}</div>
        <div>{currentPage}</div>
        <div>{currentPage + 1}</div>
        <div>Last</div>
      </div> */}
    </>
  );
}

export default SortableTable;
