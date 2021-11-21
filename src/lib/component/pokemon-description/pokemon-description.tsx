import Preact from "preact";

type PokemonDescriptionProps = {
    text: string,
}

export const PokemonDescription: Preact.FunctionalComponent<PokemonDescriptionProps> = ({text}) => {
    return (
        <p>{text}</p>
    )
}