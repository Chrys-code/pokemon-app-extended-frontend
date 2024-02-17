import { configureStore } from '@reduxjs/toolkit';
import { pokedexApiSlice } from './api/pokedex/pokedex.api';

export const store = configureStore({
    reducer: {
        // pokedex: pokedexReducer,
        [pokedexApiSlice.reducerPath]: pokedexApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(pokedexApiSlice.middleware);
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;