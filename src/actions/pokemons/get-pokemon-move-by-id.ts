import { pokeApi } from "../../config/api/pokeApi";
import { PokeMove } from "../../domain/entities/pokemon";
import { PokemonMove } from "../../infrastructure/interfaces/pokeApi.interfaces";
import { MoveMapper } from "../../infrastructure/mappers/move.mapper";




export const getPokemonMoveById = async (stringId: string): Promise<PokeMove> => {

    try {
        const asd = stringId.split('/')

        const id = Number(asd[0]);
        const lvl = Number(asd[1]);

        const { data } = await pokeApi.get<PokemonMove>(`/move/${id}`);

        const pokemonMove = await MoveMapper.pokeApiMoveToEntity(data, lvl);

        return pokemonMove;
        
    } catch (error) {
        throw new Error(`Error getting pokemon move by id: ${stringId.split('/')[0]}`)
    }
}