import { useState } from "react";

import { doc, setDoc } from "firebase/firestore";

import { db } from "../../firebase";

function EditEntry({ setIsEditing, selectedEntry, getEntriesFromDb }) {
  const { name, lastName, city, jobTitle, id } = selectedEntry;

  const [formData, setFormData] = useState({
    name: name,
    lastName: lastName,
    city: city,
    jobTitle: jobTitle
  });

  function handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (event.target.value === "Confirm") {
      editDocInDb();
    } else {
      setIsEditing(false);
    }
  }

  async function editDocInDb() {
    const entryRef = doc(db, "entries", selectedEntry.id);
    if (
      formData.name &&
      formData.lastName &&
      formData.city &&
      formData.jobTitle
    ) {
      try {
        setDoc(
          entryRef,
          { ...formData, createdAt: new Date().toLocaleString("de-DE") },
          { merge: true }
        );
      } catch (error) {
        console.error(error);
      } finally {
        setIsEditing(false);
        getEntriesFromDb();
      }
    }
  }

  return (
    <div className="flex flex-col gap-[2em] items-center py-[3em] m-auto">
      <h1 className="text-[2rem] font-bold">Edit Entry</h1>
      <form className="flex flex-col gap-[1em] items-end">
        <div className="flex items-center gap-[1em]">
          <label htmlFor="name" className="text-[1.2rem] font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={name}
            value={formData.name}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="flex items-center gap-[1em]">
          <label htmlFor="lastName" className="text-[1.2rem] font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder={lastName}
            value={formData.lastName}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="flex items-center gap-[1em]">
          <label htmlFor="city" className="text-[1.2rem] font-semibold">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder={city}
            value={formData.city}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="flex items-center gap-[1em]">
          <label htmlFor="jobTitle" className="text-[1.2rem] font-semibold">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            placeholder={jobTitle}
            value={formData.jobTitle}
            onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="flex gap-[1em] w-full">
          <input
            type="submit"
            value="Confirm"
            className="cursor-pointer bg-green-700 text-white hover:bg-green-600 w-full"
            onClick={(event) => handleFormSubmit(event)}
          />
          <input
            type="button"
            value="Cancel"
            className="cursor-pointer bg-neutral-800 text-white hover:bg-neutral-600 w-full"
            onClick={(event) => handleFormSubmit(event)}
          />
        </div>
      </form>
    </div>
  );
}

export default EditEntry;
