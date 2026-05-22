const pokemonColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#EA7CE8",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#8E829D",
  dragon: "#B79FF5",
  dark: "#918278",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

const createNewElement = function (data) {
  const { name: pokemonName, types } = data;
  const { front_default: pokemonImage } =
    data.sprites.other["official-artwork"];

  const pokemonTypesArr = types.map((item) => item.type.name);

  const card = document.createElement("div");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const typesDiv = document.createElement("div");

  h2.textContent = pokemonName;
  img.src = pokemonImage;
  img.alt = pokemonName;
  img.width = 240;
  img.height = 240;

  card.setAttribute("class", "pokemonCard");

  card.append(h2);
  card.append(img);

  pokemonTypesArr.map((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    span.style.backgroundColor = pokemonColors[item];
    span.setAttribute("class", "pokemonType");
    typesDiv.append(span);
  });

  card.append(typesDiv);
  return card;
};

// Add your code here
const fetchData = async function () {
  const url = "https://pokeapi.co/api/v2/pokemon/bulbasaur";

  const pokeList = document.querySelector(".poke-list");

  try {
    const response = await fetch(url);
    const bodyData = await response.json();

    console.log(bodyData);

    const elem = createNewElement(bodyData);
    pokeList.append(elem);
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorElem = document.createElement("p");
    errorElem.textContent = "Failed to load Pokémon data.";
    errorElem.setAttribute("class", "errorMessage");
    pokeList.append(errorElem);
  } finally {
    console.log("Fetch attempt completed.");
    const loading = document.querySelector(".loading-container");
    loading.setAttribute("class", "displayNone");
  }
};

//fetchData();

// Add your code here
const fetchDataAll = async function () {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0";

  const pokeList = document.querySelector(".poke-list");

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    const pokemonList = data.results;

    console.log(data.results);

    const promises = pokemonList.map((pokemon) => {
      return fetch(pokemon.url)
        .then((res) => res.json())
        .catch((error) =>
          console.error(`Error fetching data for ${pokemon.name}:`, error),
        );
    });

    const pokemonData = await Promise.all(promises);

    pokemonData.forEach((pokemon) => {
      const elem = createNewElement(pokemon);
      pokeList.append(elem);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorElem = document.createElement("p");
    errorElem.textContent = "Failed to load Pokémon data.";
    errorElem.setAttribute("class", "errorMessage");
    pokeList.append(errorElem);
  } finally {
    console.log("Fetch attempt completed.");
    const loading = document.querySelector(".loading-container");
    loading.setAttribute("class", "displayNone");
  }
};

fetchDataAll();
