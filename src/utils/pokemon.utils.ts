import type { Pokemon } from "../types/pokemon-battle.types";

export const getRandomDefender = (pokemonsList: Pokemon[], selectedAttackerId: string): Pokemon => {
    const filteredPokemons = pokemonsList.filter(pokemon => pokemon.id !== selectedAttackerId);
    const randomIndex = Math.floor(Math.random() * filteredPokemons.length);
    return filteredPokemons[randomIndex];
  };