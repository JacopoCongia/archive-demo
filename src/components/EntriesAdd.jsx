import { useState } from "react";

function EntriesAdd({ handleAddEntry }) {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    description: "",
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
      formData.age &&
      formData.description
    ) {
      handleAddEntry(formData);
      setFormData({
        name: "",
        lastName: "",
        age: "",
        description: "",
      });
    } else {
      alert("Please fill all of the fields before adding an entry");
    }
  }

  return (
    <div className="p-10 flex items-center justify-center">
      <form>
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
          type="number"
          id="age"
          name="age"
          placeholder="Age"
          value={formData.age}
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
          onClick={(event) => handleFormSubmit(event)}
        />
      </form>
    </div>
  );
}

export default EntriesAdd;
