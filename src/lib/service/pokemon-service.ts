import {
    APILanguage,
    APIVersion,
    CardImageError,
    PokemonCardResponse,
    PokemonSpecies,
    PokemonSpeciesAllResponse,
    PokemonSpeciesResponse, PokemonStore,
    ShakespeareResponse, StoredPokemon
} from "../types";



class PokemonService {
    constructor(
        private readonly baseUrlPokemon: string,
        private readonly baseUrlPokemonImages: string,
        private readonly baseUrlTranslationsApi: string,
        private readonly languagePreference: APILanguage,
        private readonly versionPreference: APIVersion,
        private readonly storageKeyName: string
    ) {}

    /**
     *  Translations and pokemon API both return cache-control headers so we
     *  can rely on the browser there. But the cards api does not. so we cache
     *  these here.
     */
    private cardsCache: Map<string, string> = new Map()

    /**
     * TODO we could use this to implement an autocomplete using a trie
     */
    public getAllSpecies(): Promise<Array<string>> {
        return fetch(`${this.baseUrlPokemon}/pokemon-species`).then(
            response => response.json()
        ).then((data: PokemonSpeciesAllResponse ) => {
            return data.results.map(species => species.name)
        })
    }

    private cleanDescription(desc: string): string {
        return desc.replace(/\n/g, ' ')
    }

    /**
     * We try to find a description matching the preferences in the
     * configuration.
     */
    private getSpeciesDescription(flavorTexts: PokemonSpeciesResponse['flavor_text_entries']): string | null {
        let firstOfLanguage: string | null = null


        for(let i = 0; i < flavorTexts.length; i++) {
            const { language: {name: langName}, version: { name: versionName } } = flavorTexts[i];
            if(langName === this.languagePreference ) {

                if(versionName === this.versionPreference) {
                    return this.cleanDescription(flavorTexts[i].flavor_text);
                }

                if(!firstOfLanguage) {
                    firstOfLanguage = this.cleanDescription(flavorTexts[i].flavor_text)
                }
            }
        }

        const defaultValue = flavorTexts[0] ? this.cleanDescription(flavorTexts[0].flavor_text) : null

        return firstOfLanguage || defaultValue
    }

    public getSpecies(name: string): Promise<PokemonSpecies> {
        return fetch(`${this.baseUrlPokemon}/pokemon-species/${name}`)
            .then(response => response.json())
            .then((data: PokemonSpeciesResponse) => {

                return {
                    name: data.name,
                    id: data.id,
                    description: this.getSpeciesDescription(data.flavor_text_entries)
                }
            })
    }

    public getTranslatedDescription(description: string): Promise<string> {
        const url = `${this.baseUrlTranslationsApi}/translate/shakespeare.json?text=${encodeURIComponent(description)}`
        return fetch(url )
            .then(response => response.json())
            .then((data: ShakespeareResponse) => {
                return data.contents.translated
            })
            .catch(() => {
                return Promise.resolve(description)
            })
    }

    public getSpeciesCardImage(name: string): Promise<string> {

        if(this.cardsCache.has(name)) {
            return Promise.resolve(this.cardsCache.get(name) as string)
        }

        return fetch(`${this.baseUrlPokemonImages}/cards?q=name:${encodeURIComponent(name)}`)
            .then(response => response.json())
            .then(({data}: PokemonCardResponse) => {
                if(!data.length) {
                    throw new Error(CardImageError.NoCardFound)
                }

                const [cardData] = data;

                if(!cardData.images.large) {
                    throw new Error(CardImageError.NoCardFound)
                }

                const image = cardData.images.large;

                this.cardsCache.set(name, image)

                return image
            })
    }

    public async favoritePokemon(name: string): Promise<PokemonStore> {
        const species = await this.getSpecies(name)
        const data: StoredPokemon = {
            name: species.name,
            image: await this.getSpeciesCardImage(name),
            description: species.description ? await this.getTranslatedDescription(species.description) : null
        }

        const newData = {
            ...this.getFavoritePokemon(),
            [data.name]: data
        }

        localStorage.setItem(this.storageKeyName, JSON.stringify(newData))

        return newData
    }

    public unFavoritePokemon(name: string): PokemonStore {
        const data = this.getFavoritePokemon();
        if(data[name]) {
            delete data[name]
        }

        localStorage.setItem(this.storageKeyName, JSON.stringify(data))

        return {...data};
    }

    public getFavoritePokemon(): PokemonStore {
        const data = localStorage.getItem(this.storageKeyName)

        if(data) {
            return JSON.parse(data)
        }

        return {}
    }
}

export const pokemonService = new PokemonService(
    import.meta.env.VITE_API_POKEMON,
    import.meta.env.VITE_API_POKEMON_IMAGES,
    import.meta.env.VITE_API_SHAKESPEARE,
    // TODO Validate these values
    import.meta.env.VITE_POKEMON_LANGUAGE_PREFERENCE as APILanguage,
    import.meta.env.VITE_POKEMON_VERSION_PREFERENCE as APIVersion,
    'pokemon'
)