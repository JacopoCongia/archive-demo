import { useEffect, useState } from "react";

import { nanoid } from "nanoid";

import Navbar from "./components/Navbar";
import EntriesAdd from "./components/EntriesAdd";
import SortableTable from "./components/SortableTable";

import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase.js";

function App() {
  const [entries, setEntries] = useState([]);

  const getEntriesFromDb = async () => {
    const querySnapshot = await getDocs(collection(db, "entries"));
    const people = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    setEntries(people);
  };

  const addEntryToDb = async (entry) => {
    try {
      await addDoc(collection(db, "entries"), entry);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  function handleAddEntry(entry) {
    const updatedEntry = {
      ...entry,
      createdAt: new Date().toLocaleString("de-DE")
    };
    addEntryToDb(updatedEntry);
    getEntriesFromDb();
  }

  async function handleRemoveEntry(entry) {
    const updatedEntries = entries.filter((item) => {
      return entry.id !== item.id;
    });

    setEntries(updatedEntries);

    await deleteDoc(doc(db, "entries", entry.id));
  }

  useEffect(() => {
    getEntriesFromDb();
  }, []);

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
      render: (entry) => entry.createdAt,
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
