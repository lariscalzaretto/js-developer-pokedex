const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();

  // número e nome
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  // tipos
  const types = pokeDetail.types.map((t) => t.type.name);
  pokemon.types = types;
  pokemon.type = types[0];

  // 🔹 About
  pokemon.height = pokeDetail.height;                  // dm
  pokemon.weight = pokeDetail.weight;                  // hg
  pokemon.abilities = pokeDetail.abilities.map(a => a.ability.name);

  // 🔹 Foto (oficial)
  pokemon.photo =
    pokeDetail.sprites?.other?.['official-artwork']?.front_default ||
    pokeDetail.sprites?.front_default ||
    '';

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonById = (id) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((r) => r.json())
        .then(convertPokeApiDetailToPokemon);
    };
