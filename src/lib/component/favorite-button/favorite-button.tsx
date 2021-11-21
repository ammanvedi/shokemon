import Preact from "preact";
import heartFilled from '../../../assets/heart-fill.svg';
import heartUnFilled from '../../../assets/heart-no-fill.svg';
import styles from './favorite-button.module.scss'

type FavoriteButtonProps = {
    onClick: () => void,
    isFavorited: boolean,
}

export const FavoriteButton: Preact.FunctionalComponent<FavoriteButtonProps> = ({onClick, isFavorited}) => {
    return (
        <button className={styles.button} onClick={onClick}>

            <img alt='' className={styles.heart} src={isFavorited ? heartFilled : heartUnFilled} />
            {isFavorited ? 'Un-Favorite' : 'Favorite'}
        </button>
    )
}