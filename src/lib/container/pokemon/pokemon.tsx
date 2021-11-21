import Preact from 'preact'
import {useSpecies} from "../../hook/use-data";
import {PokemonInfo} from "../../component/pokemon-info/pokemon-info";
import {Card} from "../card/card";
import {Description} from "../description/description";
import {Loader} from "../../component/loader/loader";
import {FavoriteButton} from "../../component/favorite-button/favorite-button";
import {useCallback, useContext} from "preact/hooks";
import {FavoritesContext, FavoritesContextValue} from "../../hook/favorite-context";

type PokemonProps = {
    name: string,
    errorFallback: Preact.VNode
}

export const Pokemon: Preact.FunctionalComponent<PokemonProps> = ({name, errorFallback}) => {
    const {data, loading, error} = useSpecies(name);
    const {toggleFavorite, favorites} = useContext<FavoritesContextValue>(FavoritesContext);

    const handleFavoriteClick = useCallback(() => {
        if(!data) {
            return;
        }

        toggleFavorite(data.name)
    }, [data, toggleFavorite])

    if (loading) {
        return <Loader />
    }

    if(error || !data) {
        return errorFallback
    }

    return (
        <PokemonInfo name={data.name}
            leftContent={
                <Card name={data.name} />
            }
            bodyContent={
                <>
                    {data.description ? <Description description={data.description} /> : null}
                    <FavoriteButton onClick={handleFavoriteClick} isFavorited={!!favorites[data.name]} />
                </>
            }
        />
    )
}