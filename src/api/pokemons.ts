import axios from "axios";

export async function listAllPokemons(): Promise<any> {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        return response.data;
    } catch (err: any) {
        console.log(err)
        throw Error(`[Error Could not fetch pokemons from external api: ${err}`);
    }
}

export async function getUserPokemons({ userId }: { userId: string }): Promise<{ collection: { id: string }[] }> {
    try {
        const response = await axios.get(`http://localhost:3001/pokemons/list/${userId}`);
        return response.data;
    } catch (err: any) {
        return { collection: [] };
        // Should not throw error as collection might not be present and is how is it designed
    }
}

export async function catchPokemon({ userId, pokemonId }: { userId: string, pokemonId: string }): Promise<{ pokemons: { pokemons: { id: string }[] } }> {
    try {
        const response = await axios.post(`http://localhost:3001/pokemons/catch`, {
            userId, pokemonId
        });
        return response.data;
    } catch (err: any) {
        return { pokemons: { pokemons: [] } };
        // Should not throw error as collection might not be present and is how is it designed
    }
}