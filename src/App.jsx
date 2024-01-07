import { useState } from "react";

import { nanoid } from "nanoid";

import Navbar from "./components/Navbar";
import EntriesAdd from "./components/EntriesAdd";
import SearchBar from "./components/SearchBar";
import TableRow from "./components/TableRow";

function App() {
  const [entries, setEntries] = useState([]);

  function handleAddEntry(entry) {
    const updatedEntry = {
      ...entry,
      id: nanoid(),
    };
    setEntries((prevEntries) => [...prevEntries, updatedEntry]);
  }

  // const sortedEntries = entries.sort((a, b) => {
  //   const nameA = a.name.toUpperCase();
  //   const nameB = b.name.toUpperCase();

  //   if (nameA < nameB) {
  //     return -1;
  //   } else if (nameA > nameB) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // });

  // console.log(sortedEntries);

  function handleRemoveEntry(entry) {
    // console.log(entry);

    const updatedEntries = entries.filter((item) => {
      return entry !== item;
    });

    setEntries(updatedEntries);
  }

  const entryList = entries.map((entry) => {
    return (
      <TableRow
        key={entry.id}
        entry={entry}
        handleRemoveEntry={handleRemoveEntry}
      />
    );
  });

  return (
    <>
      <Navbar />
      <EntriesAdd
        handleAddEntry={handleAddEntry}
        setEntries={setEntries}
      />
      <div className="flex flex-col gap-[1em] items-center justify-center">
        <SearchBar />
        <table className="w-[80%]">
          <thead>
            <tr className="bg-red-800 text-white">
              <th>Name</th>
              <th>Last Name</th>
              <th>Date of Birth</th>
              <th>Description</th>
              <th className="min-w-[80px]"></th>
            </tr>
          </thead>
          <tbody>{entryList}</tbody>
        </table>
      </div>
    </>
  );
}

export default App;
