import Preact from "preact";

type PokemonInfoProps = {
    name: string,
    leftContent: Preact.ComponentChildren,
    bodyContent: Preact.ComponentChildren
}

export const PokemonInfo: Preact.FunctionalComponent<PokemonInfoProps> = ({name, leftContent, bodyContent}) => {
    return (
        <div>
            <h1>{name}</h1>
            <div>{leftContent}</div>
            <div>{bodyContent}</div>
        </div>

    )
}