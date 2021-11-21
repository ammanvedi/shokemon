import Preact from "preact";
import styles from './pokemon-description.module.scss'

type PokemonDescriptionProps = {
    text: string,
}

export const PokemonDescription: Preact.FunctionalComponent<PokemonDescriptionProps> = ({text}) => {
    return (
        <p className={styles.description} >{text}</p>
    )
}