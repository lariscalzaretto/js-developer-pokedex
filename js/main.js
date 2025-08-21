const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 12;
let offset = 0;

const MAX_LOCAL_GIF = 650;

// Decide qual imagem usar para cada Pokémon
function getPokemonImageSrc(pokemon) {
  const id = pokemon.number;
  const localGif = `./assets/css/pokemons/poke_${id}.gif`;
  const pokePng = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const pokeArt = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  // Até 650 tenta o GIF local; depois disso usa a PokeAPI
  return {
    src: id <= MAX_LOCAL_GIF ? localGif : pokePng,
    fallback: id <= MAX_LOCAL_GIF ? pokePng : pokeArt
  };
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
      const newHTML = pokemons.map((pokemon) => {
        const { src, fallback } = getPokemonImageSrc(pokemon);
        return `
          <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">
            <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>
              <img src="${src}" alt="${pokemon.name}" onerror="this.onerror=null; this.src='${fallback}'">
            </div>
          </li>
        `;
      }).join('');
      pokemonList.innerHTML += newHTML;
    })
    .catch((err) => {
      console.error('Falha ao carregar pokémons:', err);
    });
}

loadPokemonItens(offset, limit);

if (loadMoreButton) {
  loadMoreButton.addEventListener('click', () => {
    offset += limit;
    loadPokemonItens(offset, limit);
  });
}
