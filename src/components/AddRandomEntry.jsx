import { fakerDE as faker } from "@faker-js/faker";

function AddRandomEntry({ setEntries }) {
  function handleClick(e) {
    e.preventDefault();
    setEntries((prevEntries) => [
      ...prevEntries,
      {
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        city: faker.location.city(),
        description: faker.person.bio(),
        id: faker.string.nanoid(10),
        createdAt: new Date()
      }
    ]);
  }

  return (
    <>
      <button
        className="border bg-green-700 text-white py-[0.5em] px-[2em] hover:bg-green-600"
        onClick={(e) => handleClick(e)}
      >
        Add Random Entry
      </button>
    </>
  );
}

export default AddRandomEntry;
