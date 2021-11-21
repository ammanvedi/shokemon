import Preact from 'preact'
import {useTranslatedDescription} from "../../hook/use-data";
import {PokemonDescription} from "../../component/pokemon-description/pokemon-description";
import {Loader} from "../../component/loader/loader";

type DescriptionProps = {
    description: string,
}

export const Description: Preact.FunctionalComponent<DescriptionProps> = ({description}) => {
    const {data: translatedDescription, loading} = useTranslatedDescription(description);

    if (loading) {
        return <Loader />
    }

    const desc = translatedDescription || description

    if (!desc ) {
        return null
    }

    return (
        <PokemonDescription text={desc} />
    )
}