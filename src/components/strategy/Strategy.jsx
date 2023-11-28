import styles from './strategy.module.scss'

import LanguageControlls from '../language-controlls/LanguageControlls';
import Board from '../board/Board';

const Strategy = () => {
 return (
    <section className={styles.strategy}>
        <LanguageControlls />
        <Board />
        plug    
    </section>
 )
}
export default Strategy;