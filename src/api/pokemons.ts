import axios from "axios";
import { UserPokemons } from "../contexts/pokemon/pokemon.types";
import apiAxios from "./axios/config";
import { toast } from "react-toastify";


const endpoint = `${process.env.REACT_APP_API}/pokemons`

export async function listAllPokemons(): Promise<any> {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        return response.data;
    } catch (err: any) {
        if (err.response.data.message) toast.error(`${err.response.data.message}`);
        throw Error(`[Error Could not fetch pokemons from external api: ${err}`);
    }
}

export async function getUserPokemons(): Promise<{ pokemons: UserPokemons }> {
    try {
        const response = await apiAxios.get(`${endpoint}/list`);
        return response.data;
    } catch (err: any) {
        if (err.response.data.message) toast.error(`${err.response.data.message}`);
        return { pokemons: [] };
    }
}

export async function catchPokemon({ pokemon }: { pokemon: { id: string, name: string, url: string } }): Promise<{ pokemons: UserPokemons }> {
    try {
        const response = await apiAxios.post(`${endpoint}/catch`, {
            pokemon
        });
        return response.data;
    } catch (err: any) {
        if (err.response.data.message) toast.error(`${err.response.data.message}`);
        return { pokemons: [] };
    }
}

export async function releasePokemon({ pokemonId }: { pokemonId: string }): Promise<{ pokemons: UserPokemons }> {
    try {
        const response = await apiAxios.post(`${endpoint}/release`, {
            pokemonId
        });
        return response.data;
    } catch (err: any) {
        if (err.response.data.message) toast.error(`${err.response.data.message}`);
        return { pokemons: [] };
    }
}