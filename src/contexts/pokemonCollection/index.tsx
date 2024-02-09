import { createContext, useEffect, useReducer } from 'react';
import { PokemonContext as IPokemonContext, PokemonContextActions, UserPokemon } from './pokemonCollection.types';

// Creating context to hold & mutate state
export const PokemonContext = createContext<IPokemonContext | null>(null);
export const PokemonDispatchContext = createContext<React.Dispatch<any> | null>(null);

/**
 * Pokemon provider acts as a state manager for pokemon context cotaining all pokemons and user pokemons
 * @param {ReactNode} children - The child components of the context provider 
 * @returns 
 */
export function PokemonProvider({ children }: { children: React.ReactNode }) {

    // @ts-ignore
    const [pokemons, dispatch] = useReducer(userReducer, initialPokemons);

    // Monitor pokemons context for development
    useEffect((): (() => void) => {
        console.log(pokemons)
        return (): void => { }
    }, [pokemons])

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
function userReducer(state: IPokemonContext, action: PokemonContextActions) {
    switch (action.type) {
        case 'catch': {
            return {
                ...state,
                userPokemons: [...state.userPokemons, { id: action.pokemonId }]
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
                userPokemons: action.userPokemons,
                allPokemons: action.allPokemons
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

// Initial state for pokemon collection context
const initialPokemons: IPokemonContext = { userPokemons: [], allPokemons: [] };
