import { createContext, useEffect, useReducer } from 'react';
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

    useEffect((): (() => void) => {

        console.log(pokemonListContext)

        return (): void => { }
    }, [pokemonListContext])

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
        case 'filter': {

            if (typeof action.payload.filter == "undefined") {
                throw Error('Filter cannot be undefined at' + action.type);
            }
            if (typeof action.payload.search == "undefined") {
                throw Error('Search cannot be undefined at' + action.type);
            }
            if (typeof action.payload.collection == "undefined") {
                throw Error('Collection cannot be undefined at' + action.type);
            }
            if (typeof action.payload.showSelected == "undefined") {
                throw Error('ShowSelected cannot be undefined at' + action.type);
            }
            if (typeof action.payload.limit == "undefined") {
                throw Error('Limit cannot be undefined at' + action.type);
            }

            return {
                ...state,
                search: action.payload.search,
                filter: action.payload.filter,
                collection: action.payload.collection,
                showSelected: action.payload.showSelected,
                limit: action.payload.limit
            };
        }

        case 'select': {
            if (typeof action.payload.pokemonId == "undefined") {
                throw Error('PokemonId cannot be undefined at' + action.type);
            }

            return {
                ...state,
                selected: [...state.selected, action.payload.pokemonId]
            };
        }

        case 'deselect': {
            if (typeof action.payload.pokemonId == "undefined") {
                throw Error('PokemonId cannot be undefined at' + action.type);
            }

            return {
                ...state,
                selected: state.selected.filter(pokemonId => pokemonId != action.payload.pokemonId)
            };
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

// Initial state for pokemon collection context
const initialPokemonList: PokemonListContextType = { search: null, filter: null, collection: "all", selected: [], showSelected: "all", limit: 20 };
