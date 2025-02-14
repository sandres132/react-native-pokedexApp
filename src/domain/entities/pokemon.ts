

export interface Pokemon {
    id: number;
    name: string;
    types: string[];
    avatar: string;
    sprites: string[];

    color: string;
    height: number;
    weight: number;
    games: string[];
    stats: Stat[];
    abilities: string[];
    moves: Move[];
}

export interface Stat {
    name: string;
    value: number;
}

export interface Move {
    name: string;
    level: number;
    url: string;
}

export interface PokeMove {
    name: string;
    accuracy: number;
    power: number;
    pp: number;
    target: string;
    damageClass: string;
    description: EffectEntry[];
    level: number;
}

export interface EffectEntry {
    desc: string;
    shortDesc: string;
}