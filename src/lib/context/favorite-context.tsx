import Preact, {createContext} from "preact";
import {PokemonStore} from "../types";
import {useCallback, useState} from "preact/hooks";
import {pokemonService} from "../service/pokemon-service";

export type FavoritesContextValue = {
    toggleFavorite: (name: string) => void,
    favorites: PokemonStore
}

const favoritesContextDefaultValue: FavoritesContextValue = {
    toggleFavorite: () => {},
    favorites: {}
}

export const FavoritesContext = createContext(favoritesContextDefaultValue)

export const FavoritesProvider: Preact.FunctionalComponent<{}> = ({children}) => {
    const [storeState, setStoreState] = useState<PokemonStore>(pokemonService.getFavoritePokemon())

    const toggleFavorite = useCallback((name: string) => {
        if(storeState[name]) {
            setStoreState(pokemonService.unFavoritePokemon(name));
            return;
        }

        pokemonService.favoritePokemon(name)
            .then(store => {
                setStoreState(store)
            })
    }, [storeState]);

    return (
        <FavoritesContext.Provider value={{
            favorites: storeState,
            toggleFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    )
}
