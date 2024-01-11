import { useEffect, useState } from "react";

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
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import Sidebar from "./components/Sidebar.jsx";

const auth = getAuth();

function App() {
  const [entries, setEntries] = useState([]);
  const [open, setOpen] = useState(false);

  const [user, loading] = useAuthState(auth);

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
    if (user) {
      const updatedEntries = entries.filter((item) => {
        return entry.id !== item.id;
      });

      setEntries(updatedEntries);

      await deleteDoc(doc(db, "entries", entry.id));
    }
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
      sortValue: (entry) => entry.city,
      responsive: true
    },
    {
      label: "Job Title",
      render: (entry) => entry.jobTitle,
      responsive: true
    },
    {
      label: "Added",
      render: (entry) => entry.createdAt,
      sortValue: (entry) => entry.createdAt
    },
    {
      label: "",
      render: (entry) => (
        <button
          className={`hover:bg-red-600 hover:text-white min-w-[65px] border px-[0.8em] py-[0.5em] disabled:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-black`}
          onClick={() => handleRemoveEntry(entry)}
          disabled={!user}
        >
          Remove
        </button>
      )
    }
  ];

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      {user && (
        <EntriesAdd handleAddEntry={handleAddEntry} setEntries={setEntries} />
      )}
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
