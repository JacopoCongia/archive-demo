import { useState } from "react";

import { nanoid } from "nanoid";

import Navbar from "./components/Navbar";
import EntriesAdd from "./components/EntriesAdd";

function App() {
  const [entries, setEntries] = useState([]);

  function handleAddEntry(entry) {
    const updatedEntry = { ...entry, id: nanoid() };
    setEntries((prevEntries) => [...prevEntries, updatedEntry]);
    console.log(entries);
  }

  const entryList = entries.map((entry) => {
    return (
      <tr key={entry.id}>
        <td className="text-center">{entry.name}</td>
        <td className="text-center">{entry.lastName}</td>
        <td className="text-center">{entry.age}</td>
        <td className="text-center">{entry.description}</td>
        <td className="text-center">{entry.id}</td>
      </tr>
    );
  });

  return (
    <>
      <Navbar />
      <EntriesAdd handleAddEntry={handleAddEntry} />
      <div className="flex items-center justify-center">
        <table className="w-[80%]">
          <thead>
            <tr className="bg-red-800 text-white">
              <th className="py-[1em]">Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Description</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>{entryList}</tbody>
        </table>
      </div>
    </>
  );
}

export default App;
