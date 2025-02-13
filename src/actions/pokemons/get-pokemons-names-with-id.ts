import { pokeApi } from "../../config/api/pokeApi";
import { PokeAPIPaginatedResponse } from "../../infrastructure/interfaces/pokeApi.interfaces";


export const getPokemonNamesWithId = async () => {

    const url = `pokemon?limit=1000`;
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

    return data.results.map((info) => ({
        id: Number(info.url.split('/')[6]), // trae el 7mo elemento de la cadena 'https://pokeapi.co/api/v2/pokemon/30/' en este caso el 30
        name: info.name
    }));

}