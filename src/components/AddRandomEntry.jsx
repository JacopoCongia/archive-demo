import { fakerDE as faker } from "@faker-js/faker";

function AddRandomEntry({ handleAddEntry }) {
  function handleClick(e) {
    e.preventDefault();
    handleAddEntry({
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      city: faker.location.city(),
      jobTitle: faker.person.jobTitle()
    });
  }

  return (
    <>
      <button
        className="border bg-green-700 text-white py-[0.5em] px-[2em] hover:bg-green-600 w-full  min-[500px]:max-w-[300px]"
        onClick={(e) => handleClick(e)}
      >
        Add Random Entry
      </button>
    </>
  );
}

export default AddRandomEntry;
