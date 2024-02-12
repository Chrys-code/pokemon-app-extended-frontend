import axios from "axios";
import { UserPokemons } from "../contexts/pokemon/pokemon.types";
import apiAxios from "./axios/config";

const endpoint = `${process.env.REACT_APP_API}/pokemons`

export async function listAllPokemons(): Promise<any> {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        return response.data;
    } catch (err: any) {
        console.log(err)
        throw Error(`[Error Could not fetch pokemons from external api: ${err}`);
    }
}

export async function getUserPokemons({ userId }: { userId: string }): Promise<{ pokemons: UserPokemons }> {
    try {
        const response = await apiAxios.get(`${endpoint}/list/${userId}`);
        return response.data;
    } catch (err: any) {
        return { pokemons: [] };
        // Should not throw error as collection might not be present and is how is it designed
    }
}

export async function catchPokemon({ userId, pokemon }: { userId: string, pokemon: { id: string, name: string, url: string } }): Promise<{ pokemons: UserPokemons }> {
    try {
        const response = await apiAxios.post(`${endpoint}/catch`, {
            userId, pokemon
        });
        return response.data;
    } catch (err: any) {
        return { pokemons: [] };
        // Should not throw error as collection might not be present and is how is it designed
    }
}

export async function releasePokemon({ userId, pokemonId }: { userId: string, pokemonId: string }): Promise<{ pokemons: UserPokemons }> {
    try {
        const response = await apiAxios.post(`${endpoint}/release`, {
            userId, pokemonId
        });
        return response.data;
    } catch (err: any) {
        return { pokemons: [] };
        // Should not throw error as collection might not be present and is how is it designed
    }
}