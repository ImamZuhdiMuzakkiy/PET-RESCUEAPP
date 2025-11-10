import { useState, useEffect } from "react";

//custom hooks => gabungan dari beberaoa hooks native untuk mengerjakan suatu hal yang spesifik. (ex: useBreedList untuk fetching list breed hewan.)

//localCache => gudang lokal yang berada didalam browser (sifatnya ephemeral). Ephemeral artinya kalau browser/tabnya di refresh/close data dalam localCache akan hilang.

//dipake kalau tidak mau menggunakan context/global state management. Zustand, Redux, useContext. untuk mengatasi yang namanya "prop-drilling"
const localCache = {};

export default function useBreedList(animal) {
  const [breedlist, setBreedList] = useState([]);
  const [status, setStatus] = useState("kosong");

  useEffect(() => {
    if (!animal) { //animal = ""
      setBreedList([]);
    } else if (localCache[animal]) { 
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const response = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await response.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("Loaded Successfully");
    }
  }, [animal]);

  return [breedlist, status];
}
