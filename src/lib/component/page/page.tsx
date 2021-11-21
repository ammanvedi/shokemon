import Preact from "preact";
import styles from './page.module.scss'

export const Page: Preact.FunctionalComponent<{}> = ({children}) => {
    return (
        <div className={styles.page} >
            {children}
        </div>
    )
}