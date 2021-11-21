import Preact from "preact";

type FavoriteButtonProps = {
    onClick: () => void,
    isFavorited: boolean,
}

export const FavoriteButton: Preact.FunctionalComponent<FavoriteButtonProps> = ({onClick, isFavorited}) => {
    return (
        <button onClick={onClick}>{isFavorited ? 'unfav' : 'fav'}</button>
    )
}