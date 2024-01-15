import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import AddEntry from "./components/AddEntry.jsx";
import SortableTable from "./components/SortableTable";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
import EditEntry from "./components/EditEntry.jsx";

const auth = getAuth();

function App() {
  const [entries, setEntries] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState("");

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

  function handleEditEntry(entry) {
    setSelectedEntry(entry);
    setIsEditing(true);
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
        <div className="flex text-[1.2rem] items-center justify-center gap-[0.5em] text-neutral-700">
          <button
            className={`hover:text-[#48adff] disabled:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => handleEditEntry(entry)}
            disabled={!user}
          >
            <FaEdit />
          </button>
          <button
            className={`hover:text-red-600 disabled:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() => handleRemoveEntry(entry)}
            disabled={!user}
          >
            <MdDelete />
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      {user && !isEditing && (
        <AddEntry handleAddEntry={handleAddEntry} setEntries={setEntries} />
      )}
      {user && isEditing ? (
        <EditEntry
          setIsEditing={setIsEditing}
          selectedEntry={selectedEntry}
          getEntriesFromDb={getEntriesFromDb}
        />
      ) : (
        <div className="flex flex-col gap-[1em] items-center justify-center pb-[3em]">
          <SortableTable
            entries={entries}
            tableConfig={tableConfig}
            handleRemoveEntry={handleRemoveEntry}
          />
        </div>
      )}
    </>
  );
}

export default App;
