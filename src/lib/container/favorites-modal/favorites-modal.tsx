import Preact from "preact";
import {PokemonInfo} from "../../component/pokemon-info/pokemon-info";
import {PokemonCard} from "../../component/pokemon-card/pokemon-card";
import {PokemonDescription} from "../../component/pokemon-description/pokemon-description";
import {useCallback, useContext} from "preact/hooks";
import {FavoriteButton} from "../../component/favorite-button/favorite-button";
import {FavoritesContext, FavoritesContextValue} from "../../hook/favorite-context";

export const FavoritesModal: Preact.FunctionalComponent<{}> = () => {
    const {toggleFavorite, favorites} = useContext<FavoritesContextValue>(FavoritesContext);

    const handleFavoriteClick = useCallback((name: string) => {
        toggleFavorite(name)
    }, [toggleFavorite])

    return (
        <ul>
            {Object.values(favorites).map(favorite => (
                <li>
                    <PokemonInfo
                        name={favorite.name}
                        leftContent={
                            <PokemonCard imageUrl={favorite.image} />
                        }
                        bodyContent={
                            <>
                                {favorite.description && <PokemonDescription text={favorite.description} />}
                                <FavoriteButton
                                    onClick={() => handleFavoriteClick(favorite.name)}
                                    isFavorited={!!favorites[favorite.name]}
                                />
                            </>
                        }
                    />
                </li>
            ))}
        </ul>
    )
}