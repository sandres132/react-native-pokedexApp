import { Move, PokeMove } from "../../domain/entities/pokemon";
import { getPokemonMoveById } from "./get-pokemon-move-by-id";



export const getPokemonMovesByIds = async (moves: Move[]): Promise<PokeMove[]> => {

    try {

        const stringIds = moves.map( move => (move.url.split('/')[6] + '/' + move.level.toLocaleString()));

        const strIds = stringIds.filter( str => str.split('/')[1] !== '0' )

        const pokemonMovePromises: Promise<PokeMove>[] = strIds.map( stringId => {
            return getPokemonMoveById(stringId);
        })

        return Promise.all( pokemonMovePromises );
        
    } catch (error) {
        throw new Error(`Error getting pokemons  by ids ${moves.map( move => Number(move.url.split('/')[6]))}`)
    }
}