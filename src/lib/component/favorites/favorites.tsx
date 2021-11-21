import {PokemonStore} from "../../types";
import Preact from "preact";
import {PokemonInfo} from "../pokemon-info/pokemon-info";
import {Card} from "../../container/card/card";
import {PokemonCard} from "../pokemon-card/pokemon-card";
import {PokemonDescription} from "../pokemon-description/pokemon-description";

type Favorites = {
    favorites: PokemonStore
}

export const Favorites: Preact.FunctionalComponent<Favorites> = ({favorites}) => {
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

                            </>
                        }
                    />
                </li>
            ))}
        </ul>
    )
}