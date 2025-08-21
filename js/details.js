// details.js (compacto)
(() => {
  const $ = s => document.querySelector(s);
  const list  = $('#pokemonList'), modal = $('#pokemonModal');
  if (!list || !modal) return;

  const els = {
    img:    $('#modalPokemonImage'),
    name:   $('#modalPokemonName'),
    number: $('#modalPokemonNumber'),
    types:  $('#modalPokemonTypes'),
    height: $('#modalPokemonHeight'),
    weight: $('#modalPokemonWeight'),
    abil:   $('#modalPokemonAbilities'),
    close:  modal.querySelector('.close')
  };

  const show = () => (modal.style.display = 'flex');
  const hide = () => (modal.style.display = 'none');
  const fmt3 = n => n.toString().padStart(3, '0');

  const fill = p => {
    if (els.img) {
      els.img.src = p.number <= 650 ? `./assets/css/pokemons/poke_${p.number}.gif` : (p.photo || '');
      els.img.alt = p.name || '';
    }
    if (els.name)   els.name.textContent   = p.name || '';
    if (els.number) els.number.textContent = `#${fmt3(p.number)}`;
    if (els.types)  els.types.innerHTML    = (p.types || []).map(t => `<span class="${t}">${t}</span>`).join('');
    if (els.height) els.height.textContent = `${((p.height || 0) / 10).toFixed(1)} m`;
    if (els.weight) els.weight.textContent = `${((p.weight || 0) / 10).toFixed(1)} kg`;
    if (els.abil)   els.abil.textContent   = (p.abilities || []).join(', ');
    show();
  };

  els.close?.addEventListener('click', hide);
  window.addEventListener('click', e => { if (e.target === modal) hide(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });

  list.addEventListener('click', e => {
    const card = e.target.closest('li.pokemon');
    const id = card?.dataset.id;
    if (!id) return;
    pokeApi.getPokemonById(id).then(fill).catch(console.error);
  });
})();
