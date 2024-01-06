import { fakerDE as faker } from "@faker-js/faker";

function AddRandomEntry({ setEntries }) {
  function handleClick() {
    setEntries((prevEntries) => [
      ...prevEntries,
      {
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate().toDateString(),
        description: faker.person.bio(),
        id: faker.string.nanoid(10),
      },
    ]);
  }

  return (
    <>
      <button
        className="border bg-green-700 text-white py-[0.5em] px-[2em] hover:bg-green-600"
        onClick={() => handleClick()}
      >
        Add Random Entry
      </button>
    </>
  );
}

export default AddRandomEntry;
