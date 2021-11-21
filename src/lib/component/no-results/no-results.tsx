import sadPika from '../../../assets/sad-pikachu.gif'
import styles from './no-results.module.scss'

export const NoResults = () => {
    return (<div>
        <h3 className={styles.text} >No results! Try another search.</h3>
        <img className={styles.image} src={sadPika} alt='' />
    </div>)
}