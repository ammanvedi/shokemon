import Preact from "preact";
import styles from './pokemon-card.module.scss'

type PokemonCardProps = {
    imageUrl: string
}

export const PokemonCard: Preact.FunctionalComponent<PokemonCardProps> = ({imageUrl}) => {
    return (
        <img alt='Pokemon card image' className={styles.card} src={imageUrl} />
    )
}