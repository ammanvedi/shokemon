import Preact from "preact";
import styles from './pokemon-info.module.scss'

type PokemonInfoProps = {
    name: string,
    leftContent: Preact.ComponentChildren,
    bodyContent: Preact.ComponentChildren
}

export const PokemonInfo: Preact.FunctionalComponent<PokemonInfoProps> = ({name, leftContent, bodyContent}) => {
    return (
        <article className={styles.wrapper}>
            <div className={styles.left} >{leftContent}</div>
            <div className={styles.right} >
                <h3 className={styles.name} >{name}</h3>
                {bodyContent}
            </div>
        </article>

    )
}