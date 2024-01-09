import { useState } from "react";

// DEV ONLY
import AddRandomEntry from "./AddRandomEntry";
///////////

function EntriesAdd({ handleAddEntry, setEntries }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    city: "",
    description: ""
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
      formData.description
    ) {
      handleAddEntry(formData);
      setFormData({
        name: "",
        lastName: "",
        city: "",
        description: ""
      });
    } else {
      alert("Please fill all of the fields before adding an entry");
    }
  }

  return (
    <div className="p-10 flex flex-col gap-[1em] items-center justify-center">
      <form className="flex gap-[1em] flex-wrap">
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
          id="description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(event) => handleInputChange(event)}
        />
        <input
          type="submit"
          value="Add"
          className="cursor-pointer hover:bg-green-600 hover:text-white"
          onClick={(event) => handleFormSubmit(event)}
        />
      </form>
      <AddRandomEntry setEntries={setEntries} />
    </div>
  );
}

export default EntriesAdd;
