import { useEffect, useState } from "react";
import Pet from "./Pet"
import useBreedList from "./useBreedList"

const ANIMALS = ["cat", "dog", "bird", "rabbit", "reptile"];

const SearchParams = () => {
  // const location = "Kupang, NTT"
  const [location, setLocation] = useState("Kupang, NTT");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [breeds] = useBreedList(animal);
  const [pets, setPets] = useState([]);
  //useState mengembalikan dua elemen, 1 (location) adalah nilainya, dan kedua (setLocation) adalah fungsi untuk mengubah nilai location

  useEffect(() => {
    requestPets();
  }, []);
  //useEffect menerima dua parameter, callback dan data dependencies
  // array kosong, callback dipanggil sekali setelah halaman di-render.
  // apabila array ada isinya (animal), maka callback akan dijalankan setiap kali "animal" mengalami perubahan value

  async function requestPets() {
    const response = await fetch(
      `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await response.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form action="">
        <label htmlFor="location">
          Location
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            type="text"
            id="location"
          />
        </label>
        <label htmlFor="">
          Animal
          <select
            name=""
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            onBlur={(e) => {
              (e) => {
                setAnimal(e.target.value);
                setBreed("");
              };
            }}
          >
            {/* option yang pertama untuk default */}
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="">
          Breed
          <select
            disabled={!breeds.length}
            name=""
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))}
    </div>
  );
};

export default SearchParams;
