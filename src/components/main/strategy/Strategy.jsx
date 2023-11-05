import styles from './strategy.module.scss'

import LanguageControlls from './language-controlls/LanguageControlls';
import Board from './board/Board';
import PlayersControlls from './players-controlls/PlayersControlls';

const Strategy = () => {
 return (
    <section className={styles.strategy}>
        <LanguageControlls />
        <Board />
        <PlayersControlls />
        plug    
    </section>
 )
}
export default Strategy;