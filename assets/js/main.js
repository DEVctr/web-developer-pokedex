const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

var abilitiesList = [' ']

const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">
                                                        ${type}
                                                   </li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <div id="getDetails ${pokemon.number}" class="getDetails">
                <button id="buttonId ${pokemon.number}" class="pokemon ${pokemon.type}"type="button" onClick="${abilitiesList.push(pokemon.abilities)}, 
                                                        getPokemonById(${pokemon.number})"> More Details </button>
            </div>
        </li>
    `
}

function getPokemonById(id) {
    const idPoke = id
    const detailsButton = document.getElementById(`buttonId ${id}`)
    const divDetails = document.getElementById(`getDetails ${id}`)

    detailsButton.parentElement.removeChild(detailsButton)
    divDetails.innerHTML += `
                                <div class="divButton ${id}">
                                        <h3>Abilities</h3>
                                        <ol class="list">
                                            <li class="pokemon ${id}">${abilitiesList[idPoke][0]}</li>
                                            <li class="pokemon ${id}">${abilitiesList[idPoke][1]}</li>
                                        </ol>
                                </div>
                            `.replace("undefined", "-")
}

console.log(abilitiesList)

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
