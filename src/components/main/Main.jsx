import styles from './main.module.scss'

import Strategy from '../strategy/Strategy'

const Main = () => {
  return (
  <main>
    <div className={styles.content}>
      <Strategy />
    </div>
  </main>
  )
}

export default Main