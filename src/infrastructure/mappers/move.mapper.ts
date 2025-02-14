import { PokeMove } from "../../domain/entities/pokemon";
import { PokemonMove } from "../interfaces/pokeApi.interfaces";

export class MoveMapper {

    static async pokeApiMoveToEntity( data: PokemonMove, level: number ):Promise<PokeMove> {

        return {
            name: data.name,
            accuracy: data.accuracy,
            power: data.power,
            pp: data.pp,
            target: data.target.name,
            damageClass: data.damage_class.name,
            description: data.effect_entries.map( entry => ({
                desc: entry.effect,
                shortDesc: entry.short_effect,
            })),
            level: level,
        }
    }
}