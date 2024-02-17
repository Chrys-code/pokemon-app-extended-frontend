import { configureStore } from '@reduxjs/toolkit';
import { pokedexApiSlice } from './api/pokedex/pokedex.api';
import { pokemonsApiSlice } from './api/pokemon/pokemon.api';

export const store = configureStore({
    reducer: {
        [pokedexApiSlice.reducerPath]: pokedexApiSlice.reducer,
        [pokemonsApiSlice.reducerPath]: pokemonsApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(pokedexApiSlice.middleware)
            .concat(pokemonsApiSlice.middleware);
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;