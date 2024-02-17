import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokedexState } from './pokedex.slice.types';

const initialState: PokedexState = {
    pokemon: []
}

const pokedexSlice = createSlice({
    name: 'pokedex',
    initialState: initialState,
    reducers: {
        // export stuff from here
    }
})

export default pokedexSlice.reducer;
export const { } = pokedexSlice.actions;