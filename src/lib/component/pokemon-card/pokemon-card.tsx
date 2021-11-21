import Preact from "preact";

type PokemonCardProps = {
    imageUrl: string
}

export const PokemonCard: Preact.FunctionalComponent<PokemonCardProps> = ({imageUrl}) => {
    return (
        <img src={imageUrl} />
    )
}