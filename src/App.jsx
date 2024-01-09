import { useState } from "react";

import { nanoid } from "nanoid";

import Navbar from "./components/Navbar";
import EntriesAdd from "./components/EntriesAdd";
import SearchBar from "./components/SearchBar";
import SortableTable from "./components/SortableTable";

function App() {
  const [entries, setEntries] = useState([]);

  const tableConfig = [
    {
      label: "Name",
      render: (entry) => entry.name,
      sortValue: (entry) => entry.name
    },
    {
      label: "Last Name",
      render: (entry) => entry.lastName,
      sortValue: (entry) => entry.lastName
    },
    {
      label: "City",
      render: (entry) => entry.city,
      sortValue: (entry) => entry.city
    },
    { label: "Bio", render: (entry) => entry.description },
    {
      label: "Created At",
      render: (entry) => entry.createdAt.toString(),
      sortValue: (entry) => entry.createdAt
    },
    {
      label: "",
      render: (entry) => (
        <button
          className="hover:font-bold min-w-[80px]"
          onClick={() => handleRemoveEntry(entry)}
        >
          Remove
        </button>
      )
    }
  ];

  function handleAddEntry(entry) {
    const updatedEntry = {
      ...entry,
      id: nanoid(),
      createdAt: new Date()
    };
    setEntries((prevEntries) => [...prevEntries, updatedEntry]);
  }

  function handleRemoveEntry(entry) {
    const updatedEntries = entries.filter((item) => {
      return entry !== item;
    });

    setEntries(updatedEntries);
  }

  return (
    <>
      <Navbar />
      <EntriesAdd handleAddEntry={handleAddEntry} setEntries={setEntries} />
      <div className="flex flex-col gap-[1em] items-center justify-center pb-[3em]">
        <SortableTable
          entries={entries}
          tableConfig={tableConfig}
          handleRemoveEntry={handleRemoveEntry}
        />
      </div>
    </>
  );
}

export default App;
