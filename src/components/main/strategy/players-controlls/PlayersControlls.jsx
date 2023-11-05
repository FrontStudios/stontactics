import styles from './playerscontrolls.module.scss'

import Button from '../board/buttons/Button'

const PlayersControlls = () => {
 return (
    <section className={styles.players__controlls}>
       <div className={styles.first__team}>
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
      </div>
      <div className={styles.grenades}>
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
      </div>
      <div className={styles.second__team}>
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
       <Button secondClass = {styles.player__button} />
      </div>
    </section>
 )
}
export default PlayersControlls