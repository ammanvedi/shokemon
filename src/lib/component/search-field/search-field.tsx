import Preact from "preact";
import pokeLogo from '../../../assets/pokemon.svg';
import styles from './search-field.module.scss'

type SearchFieldProps = {
    value: string,
    onChange: Preact.JSX.GenericEventHandler<HTMLInputElement>
}

export const SearchField: Preact.FunctionalComponent<SearchFieldProps> = ({
    onChange  ,
    value
}) => {
    return (
        <div className={styles.wrapper} >
            <img className={styles.img} src={pokeLogo} />
            <div>
                <input className={styles.input} type='text' id='search-input' value={value} onChange={onChange} />
                <button className={styles.button} id='search-btn' type='submit'>SEARCH</button>
            </div>
        </div>
    )
}