export type PokemonSpeciesAllResponse = {
    results: Array<{name: string}>
}

export type Language = {
    name: string
}

export type Version = {
    name: string
}

export enum APILanguage {
    en = 'en'
}

export enum APIVersion {
    red = 'red',
    blue = 'blue',
}

export type FlavorText = {
    flavor_text: string, language: Language, version: Version
}

export type PokemonSpeciesResponse = {
    id: string,
    name: string,
    flavor_text_entries: Array<FlavorText>
}

export type PokemonCard = {
    id: string,
    images: {
        small: string,
        large: string,
    }
}

export enum CardImageError {
    NoCardFound = 'NoCardFound'
}

export type PokemonCardResponse = {
    data: Array<PokemonCard>
}

export type ShakespeareResponse = {
    success: {
        total: number,
    },
    contents: {
        translated: string,
        text: string,
        translation: string,
    }
}

export type PokemonSpecies = {
    id: string,
    name: string,
    description: string | null,
}

export type StoredPokemon = {
    name: string,
    description: string | null ,
    image: string,
}

export type PokemonStore = Record<string, StoredPokemon>