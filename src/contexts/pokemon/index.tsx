import { createContext, useReducer } from 'react';
import { Pokemons, PokemonActions, UserPokemon } from './pokemon.types';

// Creating context to hold & mutate state
export const PokemonContext = createContext<Pokemons | null>(null);
export const PokemonDispatchContext = createContext<React.Dispatch<PokemonActions> | null>(null);

/**
 * Pokemon provider acts as a state manager for pokemon context cotaining all pokemons and user pokemons
 * @param {ReactNode} children - The child components of the context provider 
 * @returns 
 */
export function PokemonProvider({ children }: { children: React.ReactNode }) {

    const [pokemons, dispatch] = useReducer(pokemonReducer, initialPokemons);

    return (
        <PokemonContext.Provider value={pokemons}>
            <PokemonDispatchContext.Provider value={dispatch}>
                {children}
            </PokemonDispatchContext.Provider>
        </PokemonContext.Provider>
    );
}

/**
 * Handles state mutations
 * @param state - The state of pokemon context including all & user's pokemons
 * @param action - The actions to mutate context it only affects user's pokemons
 * @returns 
 */
function pokemonReducer(state: Pokemons, action: PokemonActions) {
    switch (action.type) {
        case 'catch': {
            return {
                ...state,
                userPokemons: action.userPokemons || state.userPokemons
            };
        }
        case 'release': {
            return {
                ...state,
                userPokemons: state.userPokemons.filter((pokemon: UserPokemon) => pokemon.id !== action.pokemonId)
            };
        }
        case 'init': {
            return {
                ...state,
                userPokemons: action.userPokemons || state.userPokemons,
                allPokemons: action.allPokemons || state.allPokemons
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

// Initial state for pokemon collection context
const initialPokemons: Pokemons = { userPokemons: [], allPokemons: [] };
