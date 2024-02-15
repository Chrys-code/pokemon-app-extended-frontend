import axios from "axios";
import { Pokedex } from "../contexts/pokemon/pokemon.types";
import axiosCli from "./axios/config";
import { toast } from "react-toastify";


const endpoint = `${process.env.REACT_APP_API}/pokedex`

export async function listAllPokemons(): Promise<any> {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        return response.data;
    } catch (err: any) {
        if (err.response.data.message) toast.error(`${err.response.data.message}`);
        throw Error(`[Error Could not fetch pokemons from external api: ${err}`);
    }
}

export async function getUserPokemons(): Promise<{ pokemons: Pokedex }> {
    try {
        const response = await axiosCli.api.get(`${endpoint}/list`);
        return response.data;
    } catch (err: any) {
        if (err.response.data.message) toast.error(`${err.response.data.message}`);
        return { pokemons: [] };
    }
}

export async function catchPokemon({ pokemon }: { pokemon: { pokemonId: string, name: string, url: string } }): Promise<{ pokemons: Pokedex }> {
    try {
        const response = await axiosCli.api.post(`${endpoint}/catch`, {
            pokemon
        });
        return response.data;
    } catch (err: any) {
        if (err.response.data.message) toast.error(`${err.response.data.message}`);
        return { pokemons: [] };
    }
}

export async function releasePokemon({ pokemonId }: { pokemonId: string }): Promise<{ pokemons: Pokedex }> {
    try {
        const response = await axiosCli.api.delete(`${endpoint}/release?id=${pokemonId}`);
        return response.data;
    } catch (err: any) {
        if (err.response.data.message) toast.error(`${err.response.data.message}`);
        return { pokemons: [] };
    }
}