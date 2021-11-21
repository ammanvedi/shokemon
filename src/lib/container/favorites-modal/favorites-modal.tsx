import Preact from "preact";
import {PokemonInfo} from "../../component/pokemon-info/pokemon-info";
import {PokemonCard} from "../../component/pokemon-card/pokemon-card";
import {PokemonDescription} from "../../component/pokemon-description/pokemon-description";
import {useCallback, useContext} from "preact/hooks";
import {FavoriteButton} from "../../component/favorite-button/favorite-button";
import {FavoritesContext, FavoritesContextValue} from "../../context/favorite-context";
import {Page} from "../../component/page/page";

export const FavoritesModal: Preact.FunctionalComponent<{}> = () => {
    const {toggleFavorite, favorites} = useContext<FavoritesContextValue>(FavoritesContext);

    const handleFavoriteClick = useCallback((name: string) => {
        toggleFavorite(name)
    }, [toggleFavorite])

    const favList = Object.values(favorites);

    if(!favList.length) {
        return null;
    }

    return (
        <Page>
            <h2>Favorites</h2>
            <ul id='favorites' >
                {favList.map(favorite => (
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
        </Page>

    )
}