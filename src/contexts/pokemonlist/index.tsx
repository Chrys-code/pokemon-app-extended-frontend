import { createContext, useReducer } from 'react';
import { PokemonListActionType, PokemonListContextType } from './pokemonlist.types';

// Creating context to hold & mutate state
export const PokemonListContext = createContext<PokemonListContextType | null>(null);
export const PokemonListDispatchContext = createContext<React.Dispatch<PokemonListActionType> | null>(null);

/**
 * Pokemon provider acts as a state manager for pokemon context cotaining all pokemons and user pokemons
 * @param {ReactNode} children - The child components of the context provider 
 * @returns 
 */
export function PokemonListProvider({ children }: { children: React.ReactNode }) {

    const [pokemonListContext, dispatch] = useReducer(pokemonListReducer, initialPokemonList);

    return (
        <PokemonListContext.Provider value={pokemonListContext}>
            <PokemonListDispatchContext.Provider value={dispatch}>
                {children}
            </PokemonListDispatchContext.Provider>
        </PokemonListContext.Provider>
    );
}

/**
 * Handles state mutations
 * @param state - The state of pokemon context including all & user's pokemons
 * @param action - The actions to mutate context it only affects user's pokemons
 * @returns 
 */
function pokemonListReducer(state: PokemonListContextType, action: PokemonListActionType) {
    switch (action.type) {
        case 'search': {
            return {
                ...state,
                search: action.payload.search ?? null
            };
        }
        case 'filter': {
            return {
                ...state,
                filter: action.payload.filter ?? null
            };
        }
        case 'collection': {
            return {
                ...state,
                collection: action.payload.collection ?? "all"
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

// Initial state for pokemon collection context
const initialPokemonList: PokemonListContextType = { search: null, filter: null, collection: "all" };
