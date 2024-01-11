import { useState } from "react";

// DEV ONLY
import AddRandomEntry from "./AddRandomEntry";
///////////

function EntriesAdd({ addEntryToDb, handleAddEntry }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    city: "",
    jobTitle: ""
  });

  function handleInputChange(event) {
    event.preventDefault();
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    if (
      formData.name &&
      formData.lastName &&
      formData.city &&
      formData.jobTitle
    ) {
      handleAddEntry(formData);
      setFormData({
        name: "",
        lastName: "",
        city: "",
        jobTitle: ""
      });
    } else {
      alert("Please fill all of the fields before adding an entry");
    }
  }

  return (
    <div className="flex flex-col gap-[1em] items-center pt-[3em] max-w-[80%] m-auto">
      <form className="flex gap-[1em] justify-center flex-wrap flex-col w-full min-[500px]:flex-row">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={(event) => handleInputChange(event)}
        />
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(event) => handleInputChange(event)}
        />
        <input
          type="text"
          id="city"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={(event) => handleInputChange(event)}
        />
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={(event) => handleInputChange(event)}
        />
        <input
          type="submit"
          value="Add"
          className="cursor-pointer hover:bg-green-600 hover:text-white"
          onClick={(event) => handleFormSubmit(event)}
        />
      </form>
      <AddRandomEntry handleAddEntry={handleAddEntry} />
    </div>
  );
}

export default EntriesAdd;
