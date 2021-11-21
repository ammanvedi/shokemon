import Preact from 'preact'
import {useCardImage} from "../../hook/use-data";
import {PokemonCard} from "../../component/pokemon-card/pokemon-card";
import {Loader} from "../../component/loader/loader";

type CardProps = {
    name: string
}

export const Card: Preact.FunctionalComponent<CardProps> = ({name}) => {
    const {data: pokemonCardImage, error, loading} = useCardImage(name);

    if (loading) {
        return <Loader />
    }

    if(error || !pokemonCardImage) {
        return <div>error</div>
    }

    return (
        <PokemonCard imageUrl={pokemonCardImage} />
    )
}